const { PG, User, Room } = require('../models');
const { Op } = require('sequelize');

class PGService {
  async getAllPGs(filters = {}, page = 1, limit = 10) {
    try {
      const where = { status: 'approved' };
      if (filters.city) where.city = { [Op.iLike]: `%${filters.city}%` };
      if (filters.pgType && filters.pgType !== 'all') where.pgType = filters.pgType;
      if (filters.minPrice || filters.maxPrice) {
        where.rent_per_month = {};
        if (filters.minPrice) where.rent_per_month[Op.gte] = filters.minPrice;
        if (filters.maxPrice) where.rent_per_month[Op.lte] = filters.maxPrice;
      }

      const offset = (page - 1) * limit;
      const { count, rows } = await PG.findAndCountAll({
        where,
        include: [{ model: User, as: 'owner', attributes: ['id', 'fullName', 'phone', 'email'] }],
        limit,
        offset,
        order: [['created_at', 'DESC']]
      });

      return { pgs: rows, total: count, page, limit, totalPages: Math.ceil(count / limit) };
    } catch (error) {
      console.error('getAllPGs error:', error);
      throw error;
    }
  }

  async getPGById(id) {
    try {
      return await PG.findOne({
        where: { id },
        include: [
          { model: User, as: 'owner', attributes: ['id', 'fullName', 'phone', 'email', 'profileImage'] },
          { model: Room, as: 'rooms' }
        ]
      });
    } catch (error) {
      console.error('getPGById error:', error);
      throw error;
    }
  }

  async createPG(pgData) {
    try {
      console.log('Creating PG for owner:', pgData.ownerId);
      const pg = await PG.create({
        ownerId: pgData.ownerId,
        name: pgData.name,
        description: pgData.description,
        address: pgData.address,
        city: pgData.city,
        state: pgData.state,
        pincode: pgData.pincode,
        pgType: pgData.pgType || pgData.pg_type,
        totalRooms: pgData.totalRooms || 0,
        amenities: pgData.amenities || [],
        rules: pgData.rules || '',
        images: pgData.images || [],
        status: 'pending'
      });
      console.log('PG created with ID:', pg.id);
      return pg;
    } catch (error) {
      console.error('createPG error:', error);
      throw error;
    }
  }

  async updatePG(id, ownerId, updateData) {
    try {
      const pg = await PG.findOne({ where: { id, ownerId } });
      if (!pg) return null;
      await pg.update(updateData);
      return pg;
    } catch (error) {
      console.error('updatePG error:', error);
      throw error;
    }
  }

  async deletePG(id, ownerId) {
    try {
      const pg = await PG.findOne({ where: { id, ownerId } });
      if (!pg) return false;
      await pg.destroy();
      return true;
    } catch (error) {
      console.error('deletePG error:', error);
      throw error;
    }
  }

  async searchPGs(query, city, pgType) {
    try {
      const where = { status: 'approved' };
      if (query) {
        where[Op.or] = [
          { name: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
          { address: { [Op.iLike]: `%${query}%` } }
        ];
      }
      if (city) where.city = { [Op.iLike]: `%${city}%` };
      if (pgType && pgType !== 'all') where.pgType = pgType;

      return await PG.findAll({
        where,
        include: [{ model: User, as: 'owner', attributes: ['id', 'fullName', 'phone'] }],
        limit: 50,
        order: [['created_at', 'DESC']]
      });
    } catch (error) {
      console.error('searchPGs error:', error);
      throw error;
    }
  }

  async getOwnerPGs(ownerId) {
    try {
      return await PG.findAll({
        where: { ownerId },
        include: [{ model: Room, as: 'rooms' }],
        order: [['created_at', 'DESC']]
      });
    } catch (error) {
      console.error('getOwnerPGs error:', error);
      throw error;
    }
  }
}

module.exports = PGService;

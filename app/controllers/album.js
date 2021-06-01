const { logger } = require('express-wolox-logger');
const { utils, errors } = require('../helpers');
const { compareData } = require('../helpers/utils');
const { albumMapper } = require('../mappers');
const { AlbumService, UserService } = require('../services');

const roleAdmin = 'administrator';

const getAlbums = async (req, res, next) => {
  try {
    const token = utils.decodeToken(req.header('token'));
    const { error, email, firstName, lastName, role } = await UserService.getUser({ email: token.email });
    if (error) {
      throw errors.unauthorized('User is not register in the DB.');
    }
    const verifyUser = compareData(token, { firstName, lastName, role, email });
    if (!verifyUser) {
      throw errors.unauthorized('the data of token it does not match with the data of the DB');
    }
    const albums = await AlbumService.getAlbums();

    logger.info(`Usuario ${email} request get to all albums`);
    return res.json(albums);
  } catch (err) {
    return next(err);
  }
};

const buyAlbum = async (req, res, next) => {
  try {
    const token = utils.decodeToken(req.header('token'));
    const { error, id, email, firstName, lastName, role } = await UserService.getUser({
      email: token.email
    });
    if (error) {
      throw errors.unauthorized('User is not register in the DB.');
    }
    const verifyUser = compareData(token, { firstName, lastName, role, email });
    if (!verifyUser) {
      throw errors.unauthorized('the data of token it does not match with the data of the DB');
    }
    const { params } = req;
    const { errorAlbum } = await AlbumService.getMyAlbumForId(id, params.id);
    if (!errorAlbum) {
      throw errors.conflictServer('you already bought this album');
    }
    const album = await AlbumService.getAlbum(params.id);
    const albumDTO = albumMapper.albumDTO({ idUser: id, album });
    await AlbumService.buyAlbum(albumDTO);
    logger.info(`${email} buy the album ${id}`);
    return res.json({ state: 'buy', album });
  } catch (err) {
    return next(err);
  }
};

const getMyAlbums = async (req, res, next) => {
  try {
    const token = utils.decodeToken(req.header('token'));
    const { error, id, email, firstName, lastName, role } = await UserService.getUser({
      email: token.email
    });
    if (error) {
      throw errors.notFound('User is not register in the DB.');
    }
    const verifyUser = compareData(token, { firstName, lastName, role, email });
    if (!verifyUser) {
      throw errors.unauthorized('the data of token it does not match with the data of the DB');
    }
    const { user_id } = req.params;
    if (roleAdmin !== role && Number(user_id) !== id) {
      throw errors.unauthorized(
        `You can only see your album, Direct to http://localhost:${process.env.PORT}/users/${id}/albums`
      );
    }
    const userInfo = await UserService.getUser({ id: user_id });
    if (userInfo.error) {
      throw errors.notFound(`user with ID ${user_id} not found`);
    }
    const myAlbums = await AlbumService.getMyAlbums(user_id);
    const msg = {
      user: userInfo.email,
      albums: myAlbums
    };
    return res.json(msg);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAlbums,
  buyAlbum,
  getMyAlbums
};

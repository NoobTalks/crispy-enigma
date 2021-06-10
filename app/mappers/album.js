exports.albumDTO = params => {
  const { idUser, album } = params;
  const { id, userId, title } = album;
  return {
    idUser,
    idAlbum: id,
    description: JSON.stringify({
      userId,
      title
    })
  };
};

const path = require('path')
const fs   = require('fs')
const { response, request } = require("express");
const { uploadFile } = require("../helpers");
const { User, Product } = require('../models')


const uploadFields = async(req = request, res = response) => {

  try{
      // const fileName = await uploadFile( req.files, ['txt', 'md'], 'textos' );
      const fileName = await uploadFile( req.files, undefined, 'imgs' );
      res.json({ fileName })
  }catch(msj){
      res.status(400).json({msj});
  }

}

const updateImages = async(req = request, res = response) => {

  const { collection, id } = req.params;

  let model;

  switch( collection ){
    case 'users':
      model = await User.findById( id );
      if( !model ){
        return res.status(400).json({
          msg: `User with id ${ id } does not exists`
        });
      }
    break;
    case 'products':
      model = await Product.findById( id );
      if( !model ){
        return res.status(400).json({
          msg: `Product with id ${ id } does not exists`
        });
      }
    break;
    default:
      return res.status(500).json({ msg: 'Something goes wrong' });
  }


  // Delete previous images
  if( model.img ){
    // Check if images exists
    const pathImage = path.join( __dirname, '../uploads', collection, model.img );

    if( fs.existsSync( pathImage ) ){
      fs.unlinkSync( pathImage );
    }
  }

  model.img = await uploadFile( req.files, undefined, collection );

  await model.save();

  res.json({
    model
  })
}


const showImage = async(req, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch( collection ){
    case 'users':
      model = await User.findById( id );
      if( !model ){
        return res.status(400).json({
          msg: `User with id ${ id } does not exists`
        });
      }
    break;
    case 'products':
      model = await Product.findById( id );
      if( !model ){
        return res.status(400).json({
          msg: `Product with id ${ id } does not exists`
        });
      }
    break;
    default:
      return res.status(500).json({ msg: 'Something goes wrong' });
  }


  if( model.img ){
    const pathImage = path.join( __dirname, '../uploads', collection, model.img );

    if( fs.existsSync( pathImage ) ){
      return res.sendFile( pathImage );
    }
  }

  const pathImage = path.join( __dirname, '../assets', 'no-image.jpg' );

  if( fs.existsSync( pathImage ) ){
    return res.sendFile( pathImage );
  }

  res.json({
    msg: 'No hay una imagen'
  })
}

module.exports = {
    showImage,
    uploadFields,
    updateImages
}
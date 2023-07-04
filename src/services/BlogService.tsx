import axios from "axios"
const obtenerToken = () => {
  return localStorage.getItem("token");
}

//const url = 'http://localhost:5000';
const url = 'http://185.211.4.103:5000'
 
const crearContenidoBlog = (blogCreacionDTO: any) => {
  let token = obtenerToken();
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return axios.post(`${url}/api/blog`, blogCreacionDTO, config);
}

const crearContenidoMetadataBlog = (metadataBlogCreacionDTOtest: any, imagesDTO: any) => {
  let formData = new FormData();
  let token = obtenerToken();
  let ordenImagesDTO: any = [];

  imagesDTO.forEach((x: any) => {
    if (x.imagen) {
      console.log(x.imagen);
      formData.append('images', x.imagen); // Append each image file individually
      ordenImagesDTO.push(x.orden);
    }
  });

  const json = JSON.stringify(metadataBlogCreacionDTOtest);
  const metadataBlogCreacionDTO = new Blob([json], {
    type: 'application/json',
  });
  formData.append('metadataBlogCreacionDTO', metadataBlogCreacionDTO);

  const jsonOrden = JSON.stringify(ordenImagesDTO);
  const ordenImagesDTOFormData = new Blob([jsonOrden], {
    type: 'application/json',
  });
  formData.append('ordenImages', ordenImagesDTOFormData);

  return axios.post(`${url}/api/blog/metadata`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
}

const obtenerBlogs = () => {

  return axios.get(`${url}/api/blog`);
}

const obtenerMetadataPorBlogId = (id: number) => {

  return axios.get(`${url}/api/blog/metadata/` + id);
}

const obtenerBlogPorId = (id: number) => {

  return axios.get(`${url}/api/blog/` + id);
}


const eliminarBlogPorId = (id: number) => {

  return axios.delete(`${url}/api/blog/` + id);
}

const editarBlogPorId = (metadataBlogCreacionDTOtest: any, id: number) => {
  let token = obtenerToken();
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  return axios.put(`${url}/api/blog/` + id, metadataBlogCreacionDTOtest, config);
}

const editarContenidoMetadataPorBlogId = (metadataBlogCreacionDTOtest: any, imagesDTO: any) => {
  let formData = new FormData();
  let token = obtenerToken();
  let ordenImagesDTO: any = [];
  let metadataIdsDTO: any = [];
   imagesDTO.forEach((x: any) => {

    if(x.metadata_id !=null){
     metadataIdsDTO.push(x.metadata_id);
    }else{
      metadataIdsDTO.push(0);

    }

    if (x.imagen) {
      formData.append('images', x.imagen); // Append each image file individually
    }

    ordenImagesDTO.push(x.orden);

  }); 

  const json = JSON.stringify(metadataBlogCreacionDTOtest);
  const metadataBlogCreacionDTO = new Blob([json], {
    type: 'application/json',
  });
  formData.append('metadataBlogCreacionDTO', metadataBlogCreacionDTO);

  const jsonOrden = JSON.stringify(ordenImagesDTO);
  const ordenImagesDTOFormData = new Blob([jsonOrden], {
    type: 'application/json',
  });
  formData.append('ordenImages', ordenImagesDTOFormData);

  const jsonMetadataId = JSON.stringify(metadataIdsDTO);
  const metadataIds = new Blob([jsonMetadataId], {
    type: 'application/json',
  });
  formData.append('metadataIds', metadataIds);
  return axios.put(`${url}/api/blog/metadata`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
}


export default { 
  crearContenidoBlog, 
  crearContenidoMetadataBlog, 
  obtenerBlogs, 
  obtenerMetadataPorBlogId,
  eliminarBlogPorId, 
  obtenerBlogPorId, 
  editarBlogPorId,
  editarContenidoMetadataPorBlogId }
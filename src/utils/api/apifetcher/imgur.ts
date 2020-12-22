import api from "../api";


const ImgurApi = {
  uploadImage:(imageBase64)=>{
    let data = new FormData();
    console.log(imageBase64)
    data.append('image', imageBase64);
    return api.imgurApi({ method: "POST", data: data })
  },
};

export default ImgurApi;

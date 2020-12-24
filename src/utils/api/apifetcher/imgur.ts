import api from "../api";


const ImgurApi = {
  uploadImage:(imageBase64)=>{
    let data = new FormData();
    console.log(imageBase64)
    data.append('image', imageBase64);
    return api.imgurApi({ url: "", method: "POST", data: data })
  },
  deleteImage:(deleteHash)=>{
    console.log(deleteHash)
    return api.imgurApi({ url: "/"+deleteHash, method: "DELETE", })
  },
};

export default ImgurApi;

const API_TOKEN = '';

const Spotify = {
    getAccessToken(){
        if(API_TOKEN){
            return API_TOKEN;
        }
    },
};

export default Spotify;

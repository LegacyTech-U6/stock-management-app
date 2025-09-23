import { defineStore } from "pinia";
import axios from "axios";
export const useAuthStore = defineStore("auth",{
  state:()=>({
    user:null,
    token:null,
    isLoading:null,
    error:null
  }),
  actions:{
    async login(username,password){
      this.isLoading = true;
      this.error = null ;

      try {
        const res = await axios.post("http://localhost:4000/api/auth/login",{
          username,
          password,
        })
        if (error) throw error
        this.user = res.data.user;
        this.token = res.data.token;
        this.error = null;

        //sauvegarde du token dans le local storage
        localStorage.setItem("token",this.token);
      } catch (err) {
        this.error = err.response?.data?.error||"Erreur de connexion";
      }finally{
        this.isLoading = false
      }
    },
    logout(){
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    }
  }
})

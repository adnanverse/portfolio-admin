import axios from "axios";
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

// ✅ Interceptor lagate hain: ye har request se pehle chalega
instance.interceptors.request.use(

  // config: request bhejne se pehle uska configuration object
  (config) => {

    // 1️⃣ Local storage se token uthate hain
    const token = localStorage.getItem('token');

    // 2️⃣ Agar token mil gaya to usse headers me daal dete hain
    if (token) {
      // `Authorization` header me token ko "Bearer <token>" format me bhejte hain
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 3️⃣ Modified config return karte hain taaki request bhej di jaaye
    return config;
  },

  // 🔴 Agar request setup me koi error aaye (bhot rare hota hai), to use reject karte hain
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
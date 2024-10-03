import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { getList } from '../api/api'; 

class TableStore {
  data = [];
  loading = false;
  error = null;
  token = "testtoken"; // Bearer Token

  constructor() {
    makeAutoObservable(this);
  }

  async fetchData() {
    this.loading = true;
    this.error = null;

    //Dev envirement
    const isDevelopment = process.env.NODE_ENV === 'development';

    try {
      let response;

      if (isDevelopment) {
        //DEV VERSION (example response.json from /public)
        response = await axios.get('/response.json');

      } else {
        // Получение данных из API
        response = await getList(this.token);
      }

      runInAction(() => {
        if (response.data && Array.isArray(response.data.results)) {
          this.data = response.data.results;
        } else {
          this.data = [];
          console.error("Expected an array in 'results' but received:", response.data.results);
        }
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.loading = false;
      });
    }
  }
}

const tableStore = new TableStore();
export default tableStore;
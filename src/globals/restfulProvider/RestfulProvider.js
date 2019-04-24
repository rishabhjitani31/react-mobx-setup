// import { observable } from "mobx";
import axios from "axios";
// import { Cookies } from "react-cookie";

const appServiceName = "http://172.16.1.38:8000";

class RestfulProvider {
  // @observable cookies = new Cookies();
  constructor() {
    this.setCommonHeaders();
  }
  setCommonHeaders = () => {
    // if (this.cookies.get("tenantId")) {
    //     axios.defaults.headers.common["Tenant-Id"] = this.cookies.get(
    //         "tenantId"
    //     );
    // }
    axios.defaults.headers.common["Tenant-Id"] = "5bf4859bb7000951f9d852c8";
  };
  deleteHeaders = () => {
    delete axios.defaults.headers.common["Tenant-Id"];
  };
  get = url => {
    this.setCommonHeaders();
    return new Promise((resolve, reject) => {
      axios
        .get(`${appServiceName}/${url}`)
        .then(res => resolve(res.data))
        .catch(error => {
          reject(error);
        });
    });
  };

  post = (url, data) => {
    if (url === "logout") {
      this.deleteHeaders();
    } else {
      this.setCommonHeaders();
    }
    return new Promise((resolve, reject) => {
      axios
        .post(`${appServiceName}/${url}`, data)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  put = (url, data) => {
    this.setCommonHeaders();
    return new Promise((resolve, reject) => {
      axios
        .put(`${appServiceName}/${url}`, data)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  delete = url => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${appServiceName}/${url}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}

export default new RestfulProvider();

import RestfulProvider from "globals/restfulProvider/RestfulProvider";

class RequestServices {
  // updateGroup = (data, propertyId, groupId) => {
  //   return RestfulProvider.put(`groups/${propertyId}/${groupId}`, data);
  // };
  // getGroups = propertyId => {
  //   return RestfulProvider.get(`groups/${propertyId}`);
  // };
  // addGroup = (data, propertyId) => {
  //   return RestfulProvider.post(`groups/${propertyId}`, data);
  // };
  // updateCategory = (data, groupId, categoryId) => {
  //   return RestfulProvider.put(`categories/${groupId}/${categoryId}`, data);
  // };
  // addCategory = (data, groupId) => {
  //   return RestfulProvider.post(`categories/${groupId}`, data);
  // };
  // getRequests = () => {
  //   return RestfulProvider.get(`requests`);
  // };
  getQuestionsList = () => {
    return RestfulProvider.get("api/questions");
  };
}
export default new RequestServices();

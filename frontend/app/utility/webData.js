const { Axiosinstance } = require("./helper")

const getAdminInfo = async () => {
    const response = await Axiosinstance.get('/setting/get');
    const data = await response.data;
    return data.data[0]

}
const getProject = async (id = null) => {
    if (id == null) {
        const response = await Axiosinstance.get('/project/get');
        const data = await response.data;
        return data.data;
    } else {
        const response = await Axiosinstance.get(`/project/get/${id}`);
        const data = await response.data;
        return data.data;
    }
}
const getSkills = async (id = null) => {
    if (id == null) {
        const response = await Axiosinstance.get('/skills/get');
        const data = await response.data;
        return data.data;
    } else {
        const response = await Axiosinstance.get(`/skills/get/${id}`);
        const data = await response.data;
        return data.data;
    }
}
export { getAdminInfo, getProject, getSkills }
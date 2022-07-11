import axios from "axios";

export const getAllStudent = async () => {
    var APIresult;
    await axios.get("http://localhost:8080/students")
        .then(res => {
            APIresult = res.data;
        })
        .catch(error => console.log(error));
    return APIresult;
}
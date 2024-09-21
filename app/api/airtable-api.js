import axios from "axios";

export default async function saveExpense(amount, category, description, currencySymbol) {
    let resp = {};


    // Post
    await axios.post("http://localhost:5000/createexpense", {

        "amount": amount,
        "category": category,
        "description": description,
        "currencySymbol": currencySymbol
    },
    ).then((response) => {
        if (response.status === 200) {
            resp.data = response.data;
        }
    })
        .catch((error) => {
            // console.log("not able to save expense");
            resp.error = error.data;
        }
        )

    return resp;
};



// Get api
export async function addFromApi() {
    let resp = {};
    await axios.get("http://localhost:5000",

    ).then(response => {
        console.log(response.data);
        resp.data = response.data
        // console.log("data", response.data);
    }).catch(error => {
        console.log(error.data)
        resp.error = error.data;
        // console.log("data", error.data);
    })
    return resp;
}



// // Delete Api
export async function delteFromApi(recordId) {
    try {
        // Correct the URL by adding a slash before recordId
        const response = await axios.delete(
            `http://localhost:5000/delete/${recordId}`
        );
        // console.log(response.data);
        return { data: response.data };
    } catch (error) {
        // console.error(error);
        return { error: error.message };
    }
}

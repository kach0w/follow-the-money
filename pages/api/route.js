export default async function handler(req, res) {
    let url = "http://www.opensecrets.org/api/?method=independentExpend&apikey=" + process.env.NEXT_PUBLIC_OPENSECRETS_API_KEY + "&output=json";
    let response = await fetch(url)
    let json = await response.json()
    // console.log()    
    res.status(200).json(json["response"]["indexp"]);

}
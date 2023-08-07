import fetch from 'node-fetch';

export default async function handler(req, res) {
  const api_key = process.env.NEXT_PUBLIC_OPENSECRETS_API_KEY
  const key = req.body.finalKey
  const nameInput = req.body.emailInput
  const urlString = "https://www.opensecrets.org/api/?method=getLegislators&id=" + key + "&output=json&apikey=" + api_key;
//   console.log(key)
  try {
    // Fetch data from the URL
    const response = await fetch(urlString);
    const jsonData = await response.json();
    let politicians = jsonData["response"]["legislator"].map((item => {
        return {
            name: item["@attributes"].firstlast, 
            id: item["@attributes"].cid
        }
    }))
    let finalName = ""
    let finalId = ""
    for(var i=0; i<politicians.length; i++){
        if(politicians[i].name.toUpperCase() === nameInput.toUpperCase()){
            // console.log("Gottem")
            finalName = nameInput
            finalId = politicians[i].id
        }
    }

    let financeDataURL = "http://www.opensecrets.org/api/?method=memPFDprofile&cid=" + finalId + "&apikey=" + process.env.NEXT_PUBLIC_OPENSECRETS_API_KEY + "&output=json";
    const financeResponse = await fetch(financeDataURL)
    const jsonFinanceData = await financeResponse.json()
    
    let contributorsDataURL = "https://www.opensecrets.org/api/?method=candContrib&cid=" + finalId + "&apikey=" + process.env.NEXT_PUBLIC_OPENSECRETS_API_KEY + "&output=json";
    const contributorsResponse = await fetch(contributorsDataURL)
    const jsonContributorData = await contributorsResponse.json()
    // console.log(contributorsDataURL)
    let industriesDataURL = "https://www.opensecrets.org/api/?method=candIndustry&cid=" + finalId + "&apikey=" + process.env.NEXT_PUBLIC_OPENSECRETS_API_KEY + "&output=json";
    const industriesResponse = await fetch(industriesDataURL)
    const jsonIndustriesData = await industriesResponse.json()
    // jsonFinanceData["response"]["member_profile"]

    const finalResponseData = [jsonFinanceData["response"]["member_profile"], jsonContributorData["response"]["contributors"]["contributor"], jsonIndustriesData["response"]["industries"]["industry"]]
    res.status(200).json(finalResponseData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching the URL.' });
  }
}

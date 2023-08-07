import fetch from 'node-fetch';

export default async function handler(req, res) {
  const api_key = process.env.NEXT_PUBLIC_OPENSECRETS_API_KEY
  const key = req.body.finalKey
  const nameInput = req.body.finalemailInput
  const urlString = "https://www.opensecrets.org/api/?method=getOrgs&org=" + nameInput + "&apikey=" + api_key + "&output=json";
  console.log(urlString)
  try {
    // Fetch data from the URL
    const response = await fetch(urlString);
    const jsonData = await response.json();
    // console.log(jsonData["response"]["organization"])
    let finalId = jsonData["response"]["organization"]["@attributes"].orgid

    let financeDataURL = "http://www.opensecrets.org/api/?method=orgSummary&id=" + finalId + "&apikey=" + process.env.NEXT_PUBLIC_OPENSECRETS_API_KEY + "&output=json";
    const financeResponse = await fetch(financeDataURL)
    const jsonFinanceData = await financeResponse.json()
    
    
    // jsonFinanceData["response"]["member_profile"]

    const finalResponseData = [jsonFinanceData["response"]["organization"]]
    res.status(200).json(finalResponseData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching the URL.' });
  }
}

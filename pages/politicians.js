import React, { useState } from "react";
import Head from 'next/head'
import { Navbar } from '../components/Navbar'

const politicians = () => {
    const [emailInput, setEmailInput] = useState("");
    const [stateInput, setStateInput] = useState("");
    const [financeData, setFinanceData] = useState(null);
    const [contributorData, setContributorData] = useState([]);
    const [industriesData, setIndustriesData] = useState([]);

    const api_key = process.env.NEXT_PUBLIC_OPENSECRETS_API_KEY;
    let stateJson = {"AL":"Alabama","AK":"Alaska","AZ":"Arizona","AR":"Arkansas","CA":"California","CO":"Colorado","CT":"Connecticut","DE":"Delaware","FL":"Florida","GA":"Georgia","HI":"Hawaii","ID":"Idaho","IL":"Illinois","IN":"Indiana","IA":"Iowa","KS":"Kansas","KY":"Kentucky","LA":"Louisiana","ME":"Maine","MD":"Maryland","MA":"Massachusetts","MI":"Michigan","MN":"Minnesota","MS":"Mississippi","MO":"Missouri","MT":"Montana","NE":"Nebraska","NV":"Nevada","NH":"New Hampshire","NJ":"New Jersey","NM":"New Mexico","NY":"New York","NC":"North Carolina","ND":"North Dakota","OH":"Ohio","OK":"Oklahoma","OR":"Oregon","PA":"Pennsylvania","RI":"Rhode Island","SC":"South Carolina","SD":"South Dakota","TN":"Tennessee","TX":"Texas","UT":"Utah","VT":"Vermont","VA":"Virginia","WA":"Washington","WV":"West Virginia","WI":"Wisconsin","WY":"Wyoming"}
    const handleSubmit = async(e) => {
        e.preventDefault()
        let finalKey = ""
        Object.keys(stateJson).forEach(function(key) {
            if(stateJson[key].toLowerCase() === stateInput.toLowerCase() || key.toLowerCase() === stateInput.toLowerCase()){
                finalKey = key; 
            }
        })
        try {
            const response = await fetch("/api/poly", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({ finalKey, emailInput }),
            })
            const data = await response.json()
            const contributorData = data[1].map((item) => {
                return {
                    "name": item["@attributes"].org_name,
                    "total": item["@attributes"].total,
                }
            })
            const industriesData = data[2].map((item) => {
                return {
                    "name": item["@attributes"].industry_name,
                    "total": item["@attributes"].total,
                }
            })
            console.log(data[2])
            setFinanceData(data[0])
            setContributorData(contributorData)
            setIndustriesData(industriesData)
          } catch (error) {
            console.error('Error:', error);
            console.log('An error occurred. Please try again.');
          }
    };
    const handleDownload = () => {
        if (financeData) {
          const blob = new Blob([JSON.stringify(financeData)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'finance_data.json';
          a.click();
          URL.revokeObjectURL(url);
        }
      };
    return (
        <div>
        <Head>
            <title>Follow the Money</title>
            <link rel="icon" href="/favicon.png" sizes="any" />      
        </Head>  
        <div>
            <Navbar />
        </div>
        <div className='relative w-[60rem] mx-auto text-center content-center '>
            {/* <div className='absolute text-[2.5rem] inset-x-0 top-0'>
                <br></br>
            </div> */}
            <h1>Politicians</h1>
            <div className='absolute w-[40rem] grid grid-cols-3 inset-y-0 left-0 mt-[15rem]'>
                <form onSubmit={handleSubmit}>
                    <br></br>
                    <p>🔍 Politician Search</p>
                    <input
                        className='rounded-md p-3 text-[black] shadow'
                        type="text"
                        value={emailInput}
                        onChange={(event) => setEmailInput(event.target.value)}
                        id="email"
                        autoComplete="off"
                        placeholder="Politician Name..." />
                    <br></br>
                    <br></br>
                    <input
                        className='rounded-md p-3 text-[black] shadow'
                        type="text"
                        value={stateInput}
                        onChange={(event) => setStateInput(event.target.value)}
                        id="email"
                        autoComplete="off"
                        placeholder="State..." />
                    <br></br>
                    <br></br>
                    <button className='bg-[#3b82f6] py-2 px-8 rounded-lg hover:shadow-lg text-[white] hover:text-slate-200'>Submit</button>
                </form>
                
            </div>
            <div className="absolute inset-y-0 right-0 ">
            <div className=" w-[40rem] rounded-md shadow-[0_1px_4px_rgba(0,0,0,0.30)] p-6 mt-[15rem]">
                { emailInput ? (
                    <h2>{emailInput.toUpperCase()}'s Financial Data</h2>
                ) : (
                    <h2>Politician's Financial Data</h2>
                )}
                <div className='mt-2 w-[15rem] p-6 text-left sm:w-[25rem] rounded-md  shadow-[0_1px_4px_rgba(0,0,0,0.30)] mx-auto p-3 mb-[3vh] text-[0.5rem] sm:text-base'>
                <h4 className='text-[#222] pb-2'>Download Financial Disclosure</h4>
                    {financeData ? (
                        <div>
                        {/* <pre>{JSON.stringify(financeData, null, 2)}</pre> */}
                        <button className="hover:underline text-[#3b82f6] pt-2"onClick={handleDownload}>Download Data</button>
                        </div>
                    ) : (
                        <p className="text-[1rem]">Finance Data...</p>
                    )}
                </div>
                
                <div className='mt-2 w-[15rem] p-6 text-left sm:w-[25rem] rounded-md shadow-[0_1px_4px_rgba(0,0,0,0.30)] mx-auto p-3 mb-[3vh] text-[0.5rem] sm:text-base'>
                <h4 className='text-[#222]'>Top Donors</h4>
                { contributorData && contributorData.length > 0 ? (
                    <ul className='text-[0.8rem] text-[#383838] pt-2'>  
                        {contributorData.map((arr, index) => (
                            <div>
                            <b><li className="font-bold" key={index}>{index+1}. {arr.name}</li></b>
                            <li className='pl-3' key={index}>Total: {arr.total}</li>
                            </div>
                        ))}
                    </ul> 
                ) : (
                    <p className="text-[1rem]">Contributor Data...</p>
                )}
                </div>
                <div className='mt-2 w-[15rem] p-6 text-left sm:w-[25rem] rounded-md  shadow-[0_1px_4px_rgba(0,0,0,0.30)] mx-auto p-3 mb-[3vh] text-[0.5rem] sm:text-base'>
                    <h4 className='text-[#222]'>Top Industries</h4>
                    { industriesData && industriesData.length > 0 ? (
                        <ul className='text-[0.8rem] text-[#383838] pt-2'>  
                            {industriesData.map((arr, index) => (
                                <div>
                                <b><li className="font-bold" key={index}>{index+1}. {arr.name}</li></b>
                                <li className='pl-3' key={index}>Total: {arr.total}</li>
                                </div>
                            ))}
                        </ul> 
                    ) : (
                        <p className="text-[1rem]">Industries Data...</p>
                    )}
                </div>
            </div>
            
            </div>
            </div>
            
        
        </div>
    )
}

export default politicians
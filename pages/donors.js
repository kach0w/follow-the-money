import React, { useState } from "react";
import Head from 'next/head'
import { Navbar } from '../components/Navbar'

const politicians = () => {
    const [emailInput, setEmailInput] = useState("");
    const [financeData, setFinanceData] = useState(null);

    const api_key = process.env.NEXT_PUBLIC_OPENSECRETS_API_KEY;
    let stateJson = {"AL":"Alabama","AK":"Alaska","AZ":"Arizona","AR":"Arkansas","CA":"California","CO":"Colorado","CT":"Connecticut","DE":"Delaware","FL":"Florida","GA":"Georgia","HI":"Hawaii","ID":"Idaho","IL":"Illinois","IN":"Indiana","IA":"Iowa","KS":"Kansas","KY":"Kentucky","LA":"Louisiana","ME":"Maine","MD":"Maryland","MA":"Massachusetts","MI":"Michigan","MN":"Minnesota","MS":"Mississippi","MO":"Missouri","MT":"Montana","NE":"Nebraska","NV":"Nevada","NH":"New Hampshire","NJ":"New Jersey","NM":"New Mexico","NY":"New York","NC":"North Carolina","ND":"North Dakota","OH":"Ohio","OK":"Oklahoma","OR":"Oregon","PA":"Pennsylvania","RI":"Rhode Island","SC":"South Carolina","SD":"South Dakota","TN":"Tennessee","TX":"Texas","UT":"Utah","VT":"Vermont","VA":"Virginia","WA":"Washington","WV":"West Virginia","WI":"Wisconsin","WY":"Wyoming"}
    const handleSubmit = async(e) => {
        e.preventDefault()
        let finalKey = ""
        let finalemailInput = emailInput.replace(" ", "+")
        console.log(finalemailInput)
        try {
            const response = await fetch("/api/donnerroute", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({ finalKey, finalemailInput }),
            })
            const data = await response.json()
            const contributorData = data.map((item) => {
                return {
                    "name": item["@attributes"].orgname,
                    "cycle": item["@attributes"].cycle,
                    "total": item["@attributes"].total,
                    "dems": item["@attributes"].dems,
                    "repubs": item["@attributes"].repubs,
                    "lobbying": item["@attributes"].lobbying,
                }
            })
            setFinanceData(contributorData[0])
            console.log(contributorData[0])
           
          } catch (error) {
            console.error('Error:', error);
            console.log('An error occurred. Please try again.');
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
            <h1>Donors</h1>
            <div className='absolute w-[40rem] grid grid-cols-3 inset-y-0 left-0 mt-[15rem]'>
                <form onSubmit={handleSubmit}>
                    <br></br>
                    <br></br>
                    <p>🔍 Donor Search</p>
                    <input
                        className='rounded-md p-3 text-[black] shadow'
                        type="text"
                        value={emailInput}
                        onChange={(event) => setEmailInput(event.target.value)}
                        id="email"
                        autoComplete="off"
                        placeholder="Donor Name..." />
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
                    <h2>Donors's Financial Data</h2>
                )}
                <div className='mt-2 w-[15rem] p-6 text-left sm:w-[25rem] rounded-md  shadow-[0_1px_4px_rgba(0,0,0,0.30)] mx-auto p-3 mb-[3vh] text-[0.5rem] sm:text-base'>
                <h4 className='text-[#222] pb-2'>Summary</h4>
                    {financeData ? (
                        <div className="text-[1rem]">
                            <div>Name: <b>{financeData.name}</b></div>
                            <div>Cycle: <b>{financeData.cycle}</b></div>
                            <div>Total: <b>{financeData.total}</b></div>
                            <div>To Democrats: <b>{financeData.dems}</b></div>
                            <div>To Republicans: <b>{financeData.repubs}</b></div>
                            <div>Lobbying: <b>{financeData.lobbying}</b></div>
                        </div>
                    ) : (
                        <p className="text-[1rem]">Finance Data...</p>
                    )}
                </div>
                
                
            </div>
            
            </div>
            </div>
            
        
        </div>
    )
}

export default politicians
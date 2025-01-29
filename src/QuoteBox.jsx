
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';


function QuoteBox(){

    const [quote, setQuote] = useState({quote: '', author: ''}) //This is the state where the quotes are stored
    const [isLoading, setIsLoading] = useState(true) //This is important to affect the loading ensure only valid calls are shown
    const API_Key = import.meta.env.VITE_QUOTE_API_KEY; //This is the API key for the API ninjas

    let options = {
        method: 'GET', //The type of method that will be used to retrieve data, http method
        headers: { 'x-api-key': API_Key } //This is the API key for API ninjas
    }

async function fetchQuote(){
    setIsLoading(true); //Loading while getting the functions is true
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes', options); 
        //Method and API key to get the function
        if(!response.ok){
            throw new Error("We Can't Fetch any data") //If you cannot get anymore data, throws error
        }
        const jsoned = await response.json() //Turns the data into a json format

        setQuote({
            quote: jsoned[0].quote, //Turns the data into an object
            author: jsoned[0].author
        },
        setIsLoading(false)) //You're done, you're done
    } catch (error) {
        console.log.error(error) //If there is an error catch it
    }

 }

    useEffect(() => {
        fetchQuote();
    }, []); // Empty dependency array means this runs only once


    return(
        <div id='quote-box' className='container p-4 my-4 bg-light rounded shadow justify-content-center'> {/*This is the container for the quotes*/}
                <FontAwesomeIcon icon={faQuoteLeft} color='DodgerBlue' size='3x'/>
                <h3 id="text" className='mb-4 justify-content-center'>{quote.quote || "Loading..."}</h3>
                <FontAwesomeIcon icon={faQuoteRight} color='DodgerBlue' size='3x' style={{justifyContent: 'flex-end'}}/>
                <h5 id="author" className='mb-4 text-muted justify-content-center'>- {quote.author || ""}</h5>
                    <button id="new-quote" className='btn me-2' onClick={fetchQuote} disabled={isLoading} style={{backgroundColor: 'DodgerBlue', color: 'white'}}>
                        New Quote {/*This is the button to get a new quote*/}
                    </button>
                    <a id="tweet-quote" className='btn btn-info' href={`https://twitter.com/intent/tweet?text=${quote.quote}`}>
                        Tweet Quote {/*This is the button to tweet the quote*/}
                    </a>
        </div>
    )
}

export default QuoteBox
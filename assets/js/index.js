
let ContractAddress = "0xca0b36afbd79328e2480b45064819a7c18d21ab0";
let networklist = [ "0x4" , "0x1"  ];
let networksetting = 1;

window.onload = async function(){
    ethereum.on('chainChanged', (_chainId) => window.location.reload());
    opensea = document.getElementById("opensea");
//    console.log("onload ok")
    opensea.addEventListener("mouseover", function( event ) {
    opensea.style.opacity=1; 
    }, false);    
    opensea.addEventListener("mouseleave", function( event ) {
    opensea.style.opacity=0.3; 
    }, false);
    if (window.location.href.indexOf("viewer") > -1) {
      viewer();
    }
};


function getTimezoneSelected(){
    return parseInt((document.getElementById("timezone").options[document.getElementById("timezone").selectedIndex]).value) + 24;
}

async function sendtransaction(){
    if (typeof web3 == 'undefined'){
        ans = window.confirm("please install metamask");
    } else {
        web3mm = await ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const add = await signer.getAddress();
        console.log(add);
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        console.log(chainId);
        if (chainId == networklist[networksetting] ){
            console.log("network setting ok");
        } else {
            ans = window.confirm("Please change network to Ethereum mainnet");
            return;
        }
        const planet_contract = await new ethers.Contract( ContractAddress , abi , signer );
        
        nftowner = await planet_contract.ownerOf(1);
        //console.log( nftowner );
        //console.log( add );
        
        if ( nftowner !== add ) {
            window.alert("Only owner of nft can set timezone.")
            return;
        }
        
        settime = await planet_contract.settimezone(getTimezoneSelected());
    }
}


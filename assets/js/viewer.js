timeplanetaddress = "0xca0b36afbd79328e2480b45064819a7c18d21ab0";

let timeplanetjson;

async function viewer(){
    
    setTimeout( "location.reload()" , 3600 * 1000 );
    
    //alert("this page is viewer");
    window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const timeplanet = new ethers.Contract(timeplanetaddress, abi, provider);
    const ipfshash = await timeplanet.tokenURI(1);
    //window.alert(ipfshash)
    const ipfsgateway = "https://ipfs.daonomic.com/ipfs/";
    const ipfscid = ipfshash.split("\/")[3];
    //window.alert(ipfscid);
    const timeplanetjsonuri = ipfsgateway + ipfscid;
    //window.alert(timeplanetmp4);
    //const timeplanetjson = await $.getJSON(timeplanetjsonuri);
    //window.alert(timeplanetjson)
    //window.alert("2")
    
    timeplanetjson = await fetch( timeplanetjsonuri , { mode: 'cors' } )
    
    const jsonbody = await timeplanetjson.json();
    
    
    
    //console.log(timeplanetjson);
    console.log(jsonbody.animation_url);
    
    
    const timeplanetviewer = document.getElementById("timeplanetviewer");

    const ipfsvideocid = jsonbody.animation_url.split("\/")[3];

//  timeplanetviewer.src = ipfsgateway + ipfsvideocid +"?sanitize=true";
    timeplanetviewer.src = ipfsgateway + ipfsvideocid ;
    timeplanetviewer.load();
    setTimeout( "timeplanetviewer.play()" , 30 * 1000)
    
}
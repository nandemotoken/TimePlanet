
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
}


//---------------under deployment----------
//--------------general settings--------------

//matic testnet
const ContractAddress = "0x129C80Af1B8Ef9E359f2Cee876760498D29A6457";

//mainnet
//const ContractAddress = "";

//matic matic testnet(0) or matic network(1)
const network = 0;

//---------------------------------------------


//testnet or mainnet 
//rpclist = [ "" , "" ];
explorerlist = [ "https://explorer-mumbai.maticvigil.com/tokens/" , "https://explorer-mainnet.maticvigil.com/tokens/" ];
mintnandemotokenapilist = [ "https://mint.nandemotoken.com/api/v1/testnet/" , "https://mint.nandemotoken.com/api/v1/" ];
opensealist = [ "https://testnets.opensea.io/account/" , "https://opensea.io/account/"];


let replica_contract;


function walletmodal(){
    $('#wallet-popup').modal('show');
}


async function loadmm_gasfree(){
    $('#wallet-popup').modal('hide');
    if (typeof web3 == 'undefined'){
        ans = window.confirm("metamaskをインストールしてください\nmetamaskのインストール方法を確認しますか？\n\n参考：https://pprct.net/metamask_howtouse_01/");
        if (ans){
            window.open("https://pprct.net/metamask_howtouse_01/");
        }
        return;
    }
    
    ans = window.confirm("OKを押すと『NFTチケット』がMetaMaskに送信されます")
    if ( !ans ){
        return;
    }
    
    
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const add = await signer.getAddress();

    ans2 = await signer.signMessage( "NFTチケットを受け取ります" );
    if ( ans2[1] != "x" ){
        return;
    }
    
    
    
    let result = await $.getJSON( mintnandemotokenapilist[network] + ContractAddress + "/"+ add + "/" )
    console.log(result);
    $('#myinfo').modal('show')
    
}

function explorer(){
    //window.alert("matic")
    ans = window.confirm("ブロックチェーンエクスプローラーを開く\n\n" + explorerlist[network] + ContractAddress + "/inventory\n\nNFTの発行状況を確認しますか？(通常は1分以内に発行されます)");
        if(ans){ window.open( explorerlist[network] +ContractAddress + "/inventory"); }
}

function opensea(){
    //window.alert("opensea")
    ans = window.confirm("OpenSeaでNFTレプリカを確認する\n\n"+ opensealist[network] + "\n\nOpenSeaを開き、MetaMaskを接続しますか？\n(反映には数分時間がかかります。NFTの画像は処理が終わると表示されます)");
        if(ans){ window.open( opensealist[network] ); }
}

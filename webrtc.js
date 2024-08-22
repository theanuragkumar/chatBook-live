// starting up video call by accessing  both side camer and mic
callTools.forEach((callTool) => {
    callTool.addEventListener("pointerdown", async (event) => {
     
      if (OuterVideo.style.display != "flex") {
        OuterVideo.style.display = "flex";
        VisualsBox.style.display = "flex";
        InnerVideo.style.display = "inline-block";
        
         videocallRoom=room[headtext.innerHTML];
        // accessing caller videocall
        accessMedia('initiatorMedia');
        //accessing the jisko call kiya h uska camera.
        socket.emit('accessMedia',videocallRoom);
      

  
      } else {
        OuterVideo.style.display = "none";
        VisualsBox.style.display = "none";
        InnerVideo.style.display = "none";
       const pc=PeerConnection.getInstance();
    //    console.log(pc);
       pc.getSenders().forEach(sender => pc.removeTrack(sender));
        pc.close();
       //closing the user openedmedia
       localStream.getTracks().forEach(track =>{
        track.stop();
    })

        socket.emit('close-connection',videocallRoom);
      }

      // closing the going stream

    });
  });

let videocallRoom;

//listening the event for starting the receiver camera and mic.
socket.on('accessMedia',(room)=>{
    accessMedia('responder');
    videocallRoom=room;
    
})

socket.on('media-error-call-Nconnect',(error)=>{
    const pc=PeerConnection.getInstance();
    pc.close();
    alert('Call disconnected',error);
    localStream.getTracks().forEach(track =>{
        track.stop();
    })
   
})


let localStream;



const PeerConnection =(function(){
    let peerConnection;
    const createPeerConnection =()=>{
        const config={
            iceServers:[
                {
                    urls:'stun:stun.l.google.com:19302'
                }
            ]
        };
        peerConnection =new RTCPeerConnection(config);

        localStream.getTracks().forEach( track=>{
            peerConnection.addTrack(track,localStream);
            console.log('getusermedia loaded');
            // peerConnection.addTrack(track);
        });

        peerConnection.ontrack = (event)=>{
            // adding the remote video and displaying the remote video
            OuterVideo.srcObject=event.streams[0];
            console.log('outer Video is playing');
            OuterVideo.play().then(()=>{
            console.log('outer Video is playing');
            })
            
        }

        peerConnection.onicecandidate = (event)=>{
           
            if(event.candidate)
            {   
                socket.emit('ice-candidate',event.candidate,videocallRoom);
            }
            else{
                console.log("Error occured in creating  the ice Candidate");
            }
        }
return peerConnection;        
        
    }

    return {
        getInstance: ()=>{
            if((!peerConnection) || peerConnection.signalingState === 'closed'){
                peerConnection = createPeerConnection();
            }
          
            return peerConnection;
        }
    }
})();

//this function is called by  while accessin the media function
function initiator()
{
   
  const pc= PeerConnection.getInstance();
 pc.createOffer().then((offer)=>{
    //   peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    pc.setLocalDescription((offer));

      return offer;
    }).then((offer)=>{
        //sending the offer....
        socket.emit('offer',offer,videocallRoom);
    })

    .catch(error =>{
        console.log('Error occur during offer creation setting local description',error);
    })

    socket.on('answer',answer=>{
        console.log(answer,'Initiator side answer accepted');
        // peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        // pc.setRemoteDescription(new RTCSessionDescription(answer));
        pc.setRemoteDescription((answer));


    })

    socket.on('ice-candidate',(candidate)=>{

                pc.addIceCandidate(new RTCIceCandidate(candidate))
        .catch(error =>{
            console.log('Error Adding the ICE conadiadte:',error);
        })

    })


    

}
//this function is called by  while accessin the media function
function responder()
{
    OuterVideo.style.display = "flex";
    VisualsBox.style.display = "flex";
    InnerVideo.style.display = "inline-block";

const pc=PeerConnection.getInstance();
    socket.on('offer',async(offer)=>{
       
        
        // await pc.setRemoteDescription(new RTCSessionDescription(offer));
        await pc.setRemoteDescription((offer));
        
        const answer=  await pc.createAnswer();
        //  await pc.setLocalDescription(new RTCSessionDescription(answer));
        await pc.setLocalDescription((answer));
        // socket.emit('answer',peerConnection.LocalDescription,room[headtext.innerHTML]);
     
        socket.emit('answer',answer,videocallRoom);
    });
    
    socket.on('ice-candidate',candidate=>{
        console.log(' Responder side ice-candidate accepted')
        // const pc=PeerConnection.getInstance();

        pc.addIceCandidate(new RTCIceCandidate(candidate))
        .catch(error =>{
            console.log('Error Adding the ICE conadiadte:',error);
        })
    })


}

socket.on('close-connection',()=>{
    
    const pc=PeerConnection.getInstance();
    pc.getSenders().forEach(sender => pc.removeTrack(sender));

       pc.close();

       localStream.getTracks().forEach(track =>{
        track.stop();
    })
    OuterVideo.style.display = "none";
    VisualsBox.style.display = "none";
    InnerVideo.style.display = "none";

})


async function accessMedia(type){
      
const stream = await    navigator.mediaDevices.getUserMedia({ video:true, audio  :true})
try{
    
    localStream=stream;
    // displaying the local video
    InnerVideo.srcObject=localStream;
    InnerVideo.play();
    if(type == 'responder')
        {
            
            responder();
           
        }

        else if( type == 'initiatorMedia')
        {
            initiator();
           
        }

}
catch(error) {

    socket.emit('media-error-call-Nconnect',videocallRoom,error);
    
}

}
class PeerService{
    constructor(){
        
    }

    async getAnswer(offer){
        // if we have peer
        if(this.peer){
            await this.peer.setRemoteDescription(offer)
            const ans=await this.peer.createAnswer();
            await this.peer.setLocalDescription(new RTCSessionDescription(ans))
            return ans;
        }



    }

    async getOffer(){
        if(this.peer){
            const offer =await this.peer.createOffer();
            await this.peer.setLocalDescription(new RTCSessionDescription(offer))
            return offer;

        }
    }
}

export default new PeerService();
class PeerService{
    constructor(){
        
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
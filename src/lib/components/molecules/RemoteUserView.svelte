<script lang="ts">
    import { Participant, ParticipantEvent, RemoteTrack } from "livekit-client";
    import StreamPlayer from "$lib/components/molecules/StreamPlayer.svelte";
    export let participant: Participant;
    let stream: MediaStream = new MediaStream([]);
    const updateVideoEl = (e: RemoteTrack) => {
        const streamTrack: MediaStreamTrack = e.mediaStreamTrack;
        const kind = streamTrack.kind;
        const existingOfKind = stream.getTracks().filter(t => t.kind === kind);
        if(existingOfKind.length) {
            existingOfKind.forEach(stream.removeTrack.bind(stream))
        }
        stream.addTrack(streamTrack);
        stream = stream;
    };
    if (participant) {
        participant.on(ParticipantEvent.TrackSubscribed, updateVideoEl);
        // participant.on(ParticipantEvent.TrackUnsubscribed, updateVideoEl);        
    }
    
</script>

    <StreamPlayer {stream}/>
{participant.identity}
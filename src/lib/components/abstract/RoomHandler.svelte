<script lang="ts">
    import { getContext, onDestroy, setContext } from "svelte";
    import { derived, writable } from "svelte/store";
    import type { Writable } from "svelte/store";
    import type { Room, Participant } from "livekit-client";
    import { RoomEvent } from "livekit-client";
    import { log, tag } from "missionlog";

    import { UserMedia, UserDevices } from "$lib/stores";
    import type { Media } from "$lib/stores";
    import { buildMediaConstraints } from "../../utils/mediaConstraintsBuilder";

    const room = getContext<Writable<Room>>("room");
    const unsubs = [];
    unsubs.push(
        UserMedia.subscribe(async (media) => {
            if (!$room) return;

            if (media.video) {
                $room.localParticipant.videoTracks.forEach((t) => {
                    $room.localParticipant.unpublishTrack(t.track);
                });
                await $room.localParticipant.publishTrack(media.video);
            }
            if (media.audio) {
                $room.localParticipant.audioTracks.forEach((t) => {
                    $room.localParticipant.unpublishTrack(t.track);
                });
                await $room.localParticipant.publishTrack(media.audio);
            }
        })
    );
    onDestroy(() => unsubs.forEach((u) => u()));

    let participants: Writable<Participant[]> = writable([]);

    // Get a list of existing participants
    $participants = Array.from($room.participants.values());
    // Subscribe to new participants
    $room.on(RoomEvent.ParticipantConnected, (p) => {
        log.info(tag.roomHandler, "Participant Connected", p, $participants);
        $participants = [...Array.from($participants), p];
    });
    // Subscribe to participants leaving
    $room.on(RoomEvent.ParticipantDisconnected, (p) => {
        log.info(tag.roomHandler, "Participant Disconnected", p, $participants);
        $participants = $participants.filter((_p) => _p.sid !== p.sid);
    });

    UserMedia.request({
        video: {
            aspectRatio: { ideal: 16 / 9 },
        },
        audio: true,
    });

    UserDevices.preferredDevices.subscribe((d) => {
        const media: Media = $UserMedia;
        let { constraints, needsUpdate } = buildMediaConstraints(
            d,
            media.stream
        );

        if (needsUpdate) {
            log.info(tag.roomHandler, d);
            UserMedia.request(constraints);
        }
    });

    setContext(
        "participants",
        derived(participants, (v) => v)
    );
</script>

<slot />

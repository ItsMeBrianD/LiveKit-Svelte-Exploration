export type MediaConstraintsInfos = {
    constraints: MediaStreamConstraints,
    needsUpdate: boolean
}

const buildDefault = (id) => ({deviceId: {exact: id}})
export function buildMediaConstraints(preferredDevices: Record<MediaDeviceKind, string>, existingStream?: MediaStream): MediaConstraintsInfos {
    const constraints: any = {
        video: {
            aspectRatio: { ideal: 16 / 9 },
        },
        audio: true,
    };
    if(preferredDevices.audioinput) {
        constraints.audio = buildDefault(preferredDevices.audioinput)
    }
    if(preferredDevices.videoinput) {
        constraints.video = {
            ...constraints.video,
            ...buildDefault(preferredDevices.videoinput)   
        }
    }
    
    
    



    
    

    return {constraints, needsUpdate: true};
}
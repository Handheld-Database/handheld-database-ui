import { System } from "./SystemT";

type PlatformIndex = {
    name: string;
    image: string;
    database_key: string;
    manufacturer: string;
    system: string;
}

type Platform = {
    name: string;
    database_key: string;
    manufacturer: string;
    screen_size: string;
    resolution: string;
    battery_life: string;
    weight: string;
    system: string;
    cpu: string;
    gpu: string;
    ram: string;
    arch: string;
    storage: string;
    media: string;
    connectivity: string[];
    systems: System[];
}

export type { PlatformIndex, Platform };
import { atom, useAtom } from 'jotai';
import 'react-toastify/dist/ReactToastify.css';
import SpotifyWebApi from 'spotify-web-api-js';

export const spotifyAtom = atom<SpotifyWebApi.SpotifyWebApiJs>(new SpotifyWebApi());

export const useSpotify = () => {
  const [ spotify,  ] = useAtom(spotifyAtom);
  const isAuthenticatedWithSpotify = spotify.getAccessToken() !== null;
  return {
    spotify,
    isAuthenticatedWithSpotify,
  }
}
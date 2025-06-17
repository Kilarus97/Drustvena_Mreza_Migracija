import { getAll } from '../service/sviKorisnici.service.js';
import { User } from  '../model/sviKorisnici.model.js';

export function ispisiUsers(nizUsera: User[]): void{
    const tabela = document.querySelector('#usersBody') as HTMLTableElement
    
    if (!tabela) {
        console.error('Tabela sa ID-jem "usersBody" nije pronađena.');
        return;
    }
    
    tabela.innerHTML = ''

    
    for(const user of nizUsera){
        const noviRed = tabela.insertRow()
    
        const idCell = noviRed.insertCell()
        idCell.textContent = user.id.toString() // Pretvara id u string

        const korisnickoImeCell = noviRed.insertCell()
        korisnickoImeCell.textContent = user.korisnickoIme

        const imeCell = noviRed.insertCell()
        imeCell.textContent = user.ime

        const prezimeCell = noviRed.insertCell()
        prezimeCell.textContent = user.prezime

        const datumCell = noviRed.insertCell();
        const originalniDatum = new Date(user.datumRodjenja); // Pretvara string u Date objekat
        const dan = String(originalniDatum.getDate()).padStart(2, '0'); // Dodaje 0 ispred jednocifrenih dana
        const mesec = String(originalniDatum.getMonth() + 1).padStart(2, '0'); // Meseci su 0-indeksirani, pa dodajemo 1
        const godina = originalniDatum.getFullYear(); // Dobija punu godinu
        datumCell.textContent = `${dan}/${mesec}/${godina}`; // Formatira datum u dd/MM/yyyy

    }
}

document.addEventListener('DOMContentLoaded', getAll)
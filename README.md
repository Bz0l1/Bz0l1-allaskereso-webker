## Hosting link

Hosting link: [https://allaskereso-5bd68.web.app/](https://allaskereso-webker-96da9.web.app/)

## Környezeti változók

A publikus repository miatt CooSpace-en mellékeltem a környezeti változókat.

## Felhasználók:

Két felhasználót hoztam létre:

Munkavállaló: zoli@allas.hu  
Munkaadó: ceg@allas.hu

Mindkét felhasználó jelszava 123456

## Pontozási segédlet

Készítettem egy pontozási segédletet, hogy gyorsabban menjen az ellenőrzés:  

1. Fordítási hiba nincs (ng serve kiadásakor nincs hiba): nem tapasztaltam ilyen hibát, de majd figyeld te is.  
2. Futtatási hiba nincs (böngésző konzol részében nincs hiba): nem tapasztaltam ilyen hibát, de majd figyeld te is.
3. Firebase Hosting URL (létezik, és minden végpont megfelelő módon betöltődik): az url-t megtalálod fentebb.  
4. Adatmodell definiálása (legalább 4 TypeScript interfész vagy class formájában (ugyanennyi kollekció)): az interfészeket a `models` mappában megtalálhatod.
5. Alkalmazás felbontása megfelelő számú komponensre (egyetlen komponens TS és HTML kódja sem haladja meg a 250 sort és soronként a 400 karaktert): erre figyeltem.
6. Reszponzív, mobile-first felület (minden adat látható és jól jelenik meg böngészőben is, mobil nézetben is): a reszponzívitás kissebb-nagyobb sikerrel valósult csak meg, és nem is a legjobban. 
7. Legalább 2 különböző attribútum direktíva használata: nincsenek alkalmazva.
8. Legalább 2 különböző strukturális direktíva használata: `ngIf` és `ngFor` van több helyen is felhasználva.
9. Adatátadás szülő és gyermek komponensek között (legalább 1 @Input és 1 @Output): nincs megvalósítva
10. Legalább 10 különböző Material elem helyes használata.:
      - MatButton: ``login.component.html``
      - MatCard: ``home.component.html``
      - MatCheckbox: ``register.component.html``
      - MatFormField: ``register.component.html``
      - MatInput: ``my-offers.component.html``
      - MatTooltip: ``user-profile.component.html``
      - MatIcon: ``home.component.html``
      - MatSelect: ``register.component.html``
11: Adatbevitel Angular form-ok segítségével megvalósítva (legalább 2): 
13. Nincs
14. Lifecycle hookok (1 db):
    - ngOnInit: `pages/home/home.component.html`
15. CRUD műveletekből mindegyik meg van valósítva, és mind a data serviceben (`services/data.service.ts`):
    - Create: `uploadEmployerData`
    - Read: `getAllOffers`
    - Update: `updateName`
    - Delete: `deleteQualification`
16. Megvan. lásd: `auth.service.ts` és `data.service.ts`
17. Megvan, lásd: `data.service.ts`, a környezeti változók a repoban üres stringek, coospacen mellékeltem a valós változókat.
18. Megvan, `data.service.ts`-ben:
    - `getQualifications`
    - `deleteQualification`
19. Megvan
20. Megvan, védem a belső oldalakat, illetve ha be vagy jelentkezve nem tudsz a loginra/registerre menni

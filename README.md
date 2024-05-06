## Hosting link

Hosting link: https://allaskereso-webker-96da9.web.app/

## Felhasználók:

Két felhasználót hoztam létre:

Munkavállaló: zoli@allas.hu  
Munkaadó: ceg@allas.hu

Mindkét felhasználó jelszava 123456

## Pontozási segédlet

Készítettem egy pontozási segédletet, hogy gyorsabban menjen az ellenőrzés:  

1. __Fordítási hiba nincs (ng serve kiadásakor nincs hiba):__ nem tapasztaltam ilyen hibát, de majd figyeld te is. 
 
2. __Futtatási hiba nincs (böngésző konzol részében nincs hiba):__ nem tapasztaltam ilyen hibát, de majd figyeld te is.

3. __Firebase Hosting URL (létezik, és minden végpont megfelelő módon betöltődik):__ az url-t megtalálod fentebb.  

4. __Adatmodell definiálása (legalább 4 TypeScript interfész vagy class formájában (ugyanennyi kollekció)):__ az interfészeket a `models` mappában megtalálhatod.

5. __Alkalmazás felbontása megfelelő számú komponensre (egyetlen komponens TS és HTML kódja sem haladja meg a 250 sort és soronként a 400 karaktert):__ erre figyeltem.

6. __Reszponzív, mobile-first felület (minden adat látható és jól jelenik meg böngészőben is, mobil nézetben is):__ a reszponzívitás kissebb-nagyobb sikerrel valósult csak meg, és nem is a legjobban.
 
7. __Legalább 2 különböző attribútum direktíva használata:__ nincsenek alkalmazva.

8. __Legalább 2 különböző strukturális direktíva használata:__ `ngIf` és `ngFor` van több helyen is felhasználva.

9. __Adatátadás szülő és gyermek komponensek között (legalább 1 @Input és 1 @Output):__ nincs megvalósítva

10. __Legalább 10 különböző Material elem helyes használata.:__
      - MatButton: ``login.component.html``
      - MatCard: ``home.component.html``
      - MatCheckbox: ``register.component.html``
      - MatFormField: ``register.component.html``
      - MatInput: ``my-offers.component.html``
      - MatTooltip: ``user-profile.component.html``
      - MatIcon: ``home.component.html``
      - MatSelect: ``register.component.html``

11. __Adatbevitel Angular form-ok segítségével megvalósítva (legalább 2):__ Oldalak ahol használtam:
      - ``register``
      - ``login``
      - ``my-offers``

12. __Legalább 1 saját Pipe osztály írása és használata:__ nem használtam

13. __Legalább 2 különböző Lifecycle Hook használata a teljes projektben (értelmes tartalommal, nem üresen):__ ahol használtam:
      - **ngOnInit:** ``home.component``
      - **OnDestroy:** ``navbar.component``

14. __CRUD műveletek mindegyike megvalósult (Promise, Observable használattal):__
      - **Create**: ``createUser``
      - **Read:** ``getEmployer``
      - **Update:** ``updateCompany``
      - **Delete:** ``removeOffer``

15: __CRUD műveletek service-ekbe vannak kiszervezve és megfelelő módon injektálva lettek:__ Ott vannak:
      - **auth.service.ts**
      - **data.service.ts**

16: __Firestore adatbázis használata az adatokhoz (integráció, környezeti változók használata helyes legyen):__ Ez megvalósult

17: __Legalább 2 komplex Firestore lekérdezés megvalósítása (ide tartoznak: where feltétel, rendezés, léptetés, limitálás):__ a ``data.service.ts``-ben megvan:
      - ``removeApp``, ``removeSkill``

18: __Legalább 4 különböző route a különböző oldalak eléréséhez:__ ez megtörtént.

19: __Legalább 2 route levédése azonosítással (AuthGuard) (ahol ennek értelme van, pl.: egy fórum témakör megtekinthető bárki számára, de a regisztrált felhasználó adatai nem):__ megvalósult, lásd:
      - ``auth.guard.ts``
      - ``logged-in.guard.ts``
      - ``role.guard.ts``

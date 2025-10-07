Steg-för-steg (kopierbar Markdown) – D0015E Moment I

Mål: Skriv en kort LaTeX-rapport (1–2 sidor) som sammanfattar Bentleys artikel och förklarar kubisk + två kvadratiska algoritmer för maximum subarray (med Big-O-motivering).

1) Läs inledningen två gånger

Läs artikelns första sidor där problemet introduceras.

Skriv ned: (a) grundproblemet, (b) vilka algoritmer som jämförs, (c) återkommande designidéer (save state, preprocess, scanning).

2) Skapa rapport enligt Skidbacken-mallen

Rubriker: Titel, Författare, Datum, Sammanfattning (abstract).

Abstract: 4–6 meningar om vad du presenterar (problem + tre algoritmer + att du analyserar komplexitet).

3) Definiera grundproblemet (med referens)

Med egna ord: “Givet en heltalssekvens, hitta den kontiguösa (sammanhängande) delsekvensen med störst summa (tom delsekvens = 0).”

Lägg källhänvisning till Bentley här.

4) Ge ett konkret exempel

Presentera en kort sekvens (8–12 tal, några negativa).

Visa vad uppgiften är (inte lösningen).

5) Förklara begrepp för en kurskamrat

Kort förklaring av: kontiguös delsekvens, prefixsumma, invariant, pseudokod.

Skriv så att någon som läser D0015E men inte artikeln hänger med.

6) Introducera Big-O översiktligt

3–5 meningar: Big-O beskriver hur antalet steg växer när n växer; konstanter ignoreras.

Rangordna: 
O(n)<O(nlog⁡n)<O(n2)<O(n3)
O(n)<O(nlogn)<O(n
2
)<O(n
3
).

7) Naiv/kubisk algoritm (Algorithm 1)

Idé: Testa alla start- och slutindex (L,U); summera X[L..U]; håll max.

Korrekthet: Täcker alla kontiguösa delsekvenser ⇒ max hittas.

Komplexitet (så räknar du):

Antal intervall ≈ 
n(n+1)/2=O(n2)
n(n+1)/2=O(n
2
).

Varje summa beräknas från scratch i O(n).

Totalt 
O(n2⋅n)=O(n3)
O(n
2
⋅n)=O(n
3
).

Förklara på hög nivå (inte rad-för-rad pseudokod).

8) Första kvadratiska algoritmen (Algorithm 2)

Nyckelinsikt (skriv explicit):

sum(L..U)=sum(L..U−1)+X[U]
sum(L..U)=sum(L..U−1)+X[U] ⇒ uppdatera i O(1) när U ökar.

Korrekthet: Invariant: löpande summa motsvarar exakt intervallet L..U.

Komplexitet: Yttre loop över L (n) × inre över U (≈n/2) × O(1)-uppdatering ⇒ O(n²).

9) Andra kvadratiska (Algorithm 2b, prefixsumma/CumArray)

Nyckelinsikt (skriv explicit):
Prefix 
P[i]=∑k=1iX[k]
P[i]=∑
k=1
i
	​

X[k] ⇒ 
sum(L..U)=P[U]−P[L−1]
sum(L..U)=P[U]−P[L−1] i O(1).

Korrekthet: Definitionsmässigt ger differensen exakt delsumma för L..U.

Komplexitet: Bygg 
P
P i O(n); alla (L,U) i O(n²) ⇒ total O(n²).

Obs: Hjälpdokumentet kräver kubisk + två kvadratiska. (Den linjära/Kadane är valfri här.)

10) Lyft fram insikter, inte åsikter

Skriv precis vilken relation du utnyttjar och varför den minskar tiden (t.ex. “sparar O(n) per intervall ⇒ O(n²) totalt”).

11) Diskussion/Sammanfattning

Samma problem, tre metoder → O(n³) → O(n²) i tidsvinst.

Koppla till designtekniker: preprocess, save state, iterativ uppdatering, invarianter.

5–8 meningar räcker.

12) Referenser

Lägg full referens till Bentley i slutet och hänvisa till den där du definierar problemet.
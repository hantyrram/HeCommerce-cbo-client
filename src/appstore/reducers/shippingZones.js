
const mock = [
   {
      zoneName: 'PH-Visayas',
      regions : [
         {
            country: "Philippines",
            philippineIslandGroup: "Visayas",
            geolevel: "philippineIslandGroup"
         }
      ]
   },
   {
      zoneName: 'PH-Luzon',
      regions : [
         {
            country: "Philippines",
            philippineIslandGroup: "Luzon",
            geolevel: "philippineIslandGroup"
         }
      ]
   },
   {
      zoneName: 'PH-Mindanao',
      regions : [
         {
            country: "Philippines",
            philippineIslandGroup: "Luzon",
            geolevel: "philippineIslandGroup"
         }
      ]
   },
   {
      zoneName: 'World',
      regions : [
         { 
            geolevel: "world" 
         }
      ]
   },
]

export default  (state = mock, action) => {

   return Object.assign([],state);
}

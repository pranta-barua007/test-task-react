type BaseSector = {
  value: number;
  name: string;
  origin: "sector";
};

type BaseSubSector = {
  parentSectorValue: number;
  origin: "subsector";
} & Omit<BaseSector, "origin" | "sectors">;

type SubSector = ({
  hasNext: false;
} | {
  hasNext: true;
  sectors: Array<SubSector>
}) & BaseSubSector

type Sector = (
  | {
      hasNext: false;
    }
  | {
      hasNext: true;
      sectors: Array<SubSector>
    }
) &
  BaseSector;

export const sectorsData: Sector[] = [
  {
    value: 1,
    name: "Manufacturing",
    origin: "sector",
    hasNext: true,
    sectors: [
      {
        parentSectorValue: 1,
        name: "Construction materials",
        value: 19,
        origin: "subsector",
        hasNext: false,
      },
      {
        parentSectorValue: 1,
        name: "Electronics and Optics",
        value: 18,
        origin: "subsector",
        hasNext: false,
      },
      {
        parentSectorValue: 1,
        name: "Food and Beverage",
        value: 6,
        origin: "subsector",
        hasNext: true,
        sectors: [
          {
            parentSectorValue: 6,
            name: "Bakery confectionery products",
            value: 342,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 6,
            name: "Beverages",
            value: 43,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 6,
            name: "Fish and fish products ",
            value: 43,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 6,
            name: "Meat and meat products ",
            value: 40,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 6,
            name: "Milk and dairy products",
            value: 39,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 6,
            name: "Other",
            value: 437,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 6,
            name: "Sweets and snack food",
            value: 378,
            origin: "subsector",
            hasNext: false,
          },
        ],
      },
      {
        parentSectorValue: 1,
        name: "Furniture",
        value: 13,
        origin: "subsector",
        hasNext: true,
        sectors: [
          {
            parentSectorValue: 13,
            name: "Bathroom/sauna",
            value: 389,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 13,
            name: "Bedroom",
            value: 385,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 13,
            name: "Childrens room",
            value: 390,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 13,
            name: "Kitchen",
            value: 98,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 13,
            name: "Living room",
            value: 101,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 13,
            name: "Office",
            value: 392,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 13,
            name: "Other (Furniture)",
            value: 394,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 13,
            name: "Outdoor",
            value: 341,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 13,
            name: "Project Furniture",
            value: 99,
            origin: "subsector",
            hasNext: false,
          },
        ]
      },
      {
        parentSectorValue: 1,
        name: "Machinery",
        value: 12,
        origin: "subsector",
        hasNext: true,
        sectors: [
          {
            parentSectorValue: 12,
            name: "Machinery components",
            value: 94,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 12,
            name: "Machinery equipement/tools",
            value: 91,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 12,
            name: "Manufacture of machinery",
            value: 224,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 12,
            name: "Maritime",
            value: 97,
            origin: "subsector",
            hasNext: true,
            sectors: [
              {
                parentSectorValue: 97,
                name: "Aluminium and steel workboats",
                value: 271,
                origin: "subsector",
                hasNext: false,
              },
              {
                parentSectorValue: 97,
                name: "Boat/Yacht building",
                value: 269,
                origin: "subsector",
                hasNext: false,
              },
              {
                parentSectorValue: 97,
                name: "Ship repair and conversation",
                value: 230,
                origin: "subsector",
                hasNext: false,
              },
            ]
          },
          {
            parentSectorValue: 12,
            name: "Metal structures",
            value: 93,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 12,
            name: "Other",
            value: 508,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 12,
            name: "Repair and maintenance service",
            value: 227,
            origin: "subsector",
            hasNext: false,
          },
        ]
      },
      {
        parentSectorValue: 1,
        name: "Metalworking",
        value: 11,
        origin: "subsector",
        hasNext: true,
        sectors: [
          {
            parentSectorValue: 11,
            name: "Construction of metal structures",
            value: 67,
            origin: "subsector",
            hasNext: false
          },
          {
            parentSectorValue: 11,
            name: "House and buildings",
            value: 263,
            origin: "subsector",
            hasNext: false
          },
          {
            parentSectorValue: 11,
            name: "Metal products",
            value: 267,
            origin: "subsector",
            hasNext: false
          },
          {
            parentSectorValue: 11,
            name: "Metal works",
            value: 542,
            origin: "subsector",
            hasNext: true,
            sectors: [
              {
                parentSectorValue: 542,
                name: "CNC-machining",
                value: 75,
                origin: "subsector",
                hasNext: false
              },
              {
                parentSectorValue: 542,
                name: "Forgings, Fasteners",
                value: 62,
                origin: "subsector",
                hasNext: false
              },
              {
                parentSectorValue: 542,
                name: "Gas, Plasma, Laser cutting",
                value: 69,
                origin: "subsector",
                hasNext: false
              },
              {
                parentSectorValue: 542,
                name: "MIG, TIG, Aluminum welding",
                value: 66,
                origin: "subsector",
                hasNext: false
              },
            ]
          },
        ]
      },
      {
        parentSectorValue: 1,
        name: "Plastic and Rubber",
        value: 9,
        origin: "subsector",
        hasNext: true,
        sectors: [
          {
            parentSectorValue: 9,
            name: "Packaging",
            value: 54,
            origin: "subsector",
            hasNext: false
          },
          {
            parentSectorValue: 9,
            name: "Plastic goods",
            value: 556,
            origin: "subsector",
            hasNext: false
          },
          {
            parentSectorValue: 9,
            name: "Plastic processing technology",
            value: 559,
            origin: "subsector",
            hasNext: true,
            sectors: [
              {
                parentSectorValue: 559,
                name: "Blowing",
                value: 55,
                origin: "subsector",
                hasNext: false
              },
              {
                parentSectorValue: 559,
                name: "Moulding",
                value: 57,
                origin: "subsector",
                hasNext: false
              },
              {
                parentSectorValue: 559,
                name: "Plastics welding and processing",
                value: 53,
                origin: "subsector",
                hasNext: false
              },
              {
                parentSectorValue: 559,
                name: "Plastics welding and processing",
                value: 53,
                origin: "subsector",
                hasNext: false
              },
            ]
          },
          {
            parentSectorValue: 9,
            name: "Plastic profiles",
            value: 560,
            origin: "subsector",
            hasNext: false
          }
        ]
      },
      {
        parentSectorValue: 1,
        name: "Printing",
        value: 5,
        origin: "subsector",
        hasNext: true,
        sectors: [
          {
            parentSectorValue: 5,
            name: "Advertising",
            value: 148,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 5,
            name: "Book/Periodicals printing",
            value: 150,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 5,
            name: "Labelling and packaging printing",
            value: 145,
            origin: "subsector",
            hasNext: false,
          },
        ]
      },
      {
        parentSectorValue: 1,
        name: "Textile and clothing",
        value: 7,
        origin: "subsector",
        hasNext: true,
        sectors: [
          {
            parentSectorValue: 7,
            name: "Clothing",
            value: 44,
            origin: "subsector",
            hasNext: false
          },
          {
            parentSectorValue: 7,
            name: "Textile",
            value: 45,
            origin: "subsector",
            hasNext: false
          },
        ]
      },
      {
        parentSectorValue: 1,
        name: "Wood",
        value: 8,
        origin: "subsector",
        hasNext: true,
        sectors: [
          {
            parentSectorValue: 8,
            name: "Other (Wood)",
            value: 337,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 8,
            name: "Wooden building materials",
            value: 51,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 8,
            name: "Wooden houses",
            value: 47,
            origin: "subsector",
            hasNext: false,
          }
        ]
      }
    ],
  },
  {
    value: 3,
    name: "Other",
    origin: "sector",
    hasNext: true,
    sectors: [
      {
        parentSectorValue: 3,
        name: "Creative industries",
        value: 37,
        origin: "subsector",
        hasNext: false,
      },
      {
        parentSectorValue: 3,
        name: "Energy technology",
        value: 29,
        origin: "subsector",
        hasNext: false,
      },
      {
        parentSectorValue: 3,
        name: "Environment",
        value: 33,
        origin: "subsector",
        hasNext: false,
      },
    ]
  },
  {
    value: 2,
    name: "Service",
    origin: "sector",
    hasNext: true,
    sectors: [
      {
        parentSectorValue: 2,
        name: "Business services",
        value: 25,
        origin: "subsector",
        hasNext: false,
      },
      {
        parentSectorValue: 2,
        name: "Engineering",
        value: 35,
        origin: "subsector",
        hasNext: false,
      },
      {
        parentSectorValue: 2,
        name: "Information Technology and Telecommunications",
        value: 28,
        origin: "subsector",
        hasNext: true,
        sectors: [
          {
            parentSectorValue: 28,
            name: "Data processing, Web portals, E-marketing",
            value: 581,
            origin: "subsector",
            hasNext: false
          },
          {
            parentSectorValue: 28,
            name: "Programming, Consultancy",
            value: 576,
            origin: "subsector",
            hasNext: false
          },
          {
            parentSectorValue: 28,
            name: "Software, Hardware",
            value: 121,
            origin: "subsector",
            hasNext: false
          },
          {
            parentSectorValue: 28,
            name: "Telecommunications",
            value: 122,
            origin: "subsector",
            hasNext: false
          }
        ]
      },
      {
        parentSectorValue: 2,
        name: "Tourism",
        value: 22,
        origin: "subsector",
        hasNext: false,
      },
      {
        parentSectorValue: 2,
        name: "Tanslation services",
        value: 141,
        origin: "subsector",
        hasNext: false,
      },
      {
        parentSectorValue: 2,
        name: "Transport and Logistics",
        value: 21,
        origin: "subsector",
        hasNext: true,
        sectors: [
          {
            parentSectorValue: 21,
            name: "Air",
            value: 111,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 21,
            name: "Rail",
            value: 114,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 21,
            name: "Road",
            value: 112,
            origin: "subsector",
            hasNext: false,
          },
          {
            parentSectorValue: 21,
            name: "Water",
            value: 113,
            origin: "subsector",
            hasNext: false,
          }
        ]
      }
    ]
  }
];
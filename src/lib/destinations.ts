// ─────────────────────────────────────────────────────────
// Global Destinations Database - 150+ tourist places
// organized by continent and country
// ─────────────────────────────────────────────────────────

import { Destination } from './data';

export const globalDestinations: Destination[] = [
  // ══════════════════════════ EUROPE ══════════════════════════
  // France
  { id: 'g1', name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop', tourCount: 542 },
  { id: 'g2', name: 'Nice', country: 'France', image: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=600&h=400&fit=crop', tourCount: 185 },
  { id: 'g3', name: 'Lyon', country: 'France', image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&h=400&fit=crop', tourCount: 120 },
  { id: 'g4', name: 'Marseille', country: 'France', image: 'https://images.unsplash.com/photo-1510174784895-2f31fdd5e153?w=600&h=400&fit=crop', tourCount: 98 },

  // Italy
  { id: 'g5', name: 'Rome', country: 'Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop', tourCount: 478 },
  { id: 'g6', name: 'Florence', country: 'Italy', image: 'https://images.unsplash.com/photo-1543429776-2782d6ad0467?w=600&h=400&fit=crop', tourCount: 320 },
  { id: 'g7', name: 'Venice', country: 'Italy', image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=600&h=400&fit=crop', tourCount: 290 },
  { id: 'g8', name: 'Amalfi Coast', country: 'Italy', image: 'https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=600&h=400&fit=crop', tourCount: 156 },
  { id: 'g9', name: 'Milan', country: 'Italy', image: 'https://images.unsplash.com/photo-1520440229-6469516c2371?w=600&h=400&fit=crop', tourCount: 210 },

  // Spain
  { id: 'g10', name: 'Barcelona', country: 'Spain', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop', tourCount: 267 },
  { id: 'g11', name: 'Madrid', country: 'Spain', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&h=400&fit=crop', tourCount: 310 },
  { id: 'g12', name: 'Seville', country: 'Spain', image: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=600&h=400&fit=crop', tourCount: 178 },
  { id: 'g13', name: 'Granada', country: 'Spain', image: 'https://images.unsplash.com/photo-1597040663342-45b6ba68fa2d?w=600&h=400&fit=crop', tourCount: 135 },
  { id: 'g14', name: 'Ibiza', country: 'Spain', image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=600&h=400&fit=crop', tourCount: 90 },

  // United Kingdom
  { id: 'g15', name: 'London', country: 'United Kingdom', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop', tourCount: 612 },
  { id: 'g16', name: 'Edinburgh', country: 'United Kingdom', image: 'https://images.unsplash.com/photo-1506377585622-bedcbb027afc?w=600&h=400&fit=crop', tourCount: 245 },
  { id: 'g17', name: 'Oxford', country: 'United Kingdom', image: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=600&h=400&fit=crop', tourCount: 130 },

  // Germany
  { id: 'g18', name: 'Berlin', country: 'Germany', image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&h=400&fit=crop', tourCount: 380 },
  { id: 'g19', name: 'Munich', country: 'Germany', image: 'https://images.unsplash.com/photo-1595867818082-083862f3d630?w=600&h=400&fit=crop', tourCount: 275 },
  { id: 'g20', name: 'Hamburg', country: 'Germany', image: 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?w=600&h=400&fit=crop', tourCount: 145 },
  { id: 'g21', name: 'Neuschwanstein', country: 'Germany', image: 'https://images.unsplash.com/photo-1534313314376-a72289b6181e?w=600&h=400&fit=crop', tourCount: 85 },

  // Greece
  { id: 'g22', name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&h=400&fit=crop', tourCount: 289 },
  { id: 'g23', name: 'Athens', country: 'Greece', image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&h=400&fit=crop', tourCount: 340 },
  { id: 'g24', name: 'Mykonos', country: 'Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop', tourCount: 175 },
  { id: 'g25', name: 'Crete', country: 'Greece', image: 'https://images.unsplash.com/photo-1590011987620-8b8b8b8b8b8b?w=600&h=400&fit=crop', tourCount: 210 },

  // Netherlands
  { id: 'g26', name: 'Amsterdam', country: 'Netherlands', image: 'https://images.unsplash.com/photo-1517736996303-4e64a4f87399?w=600&h=400&fit=crop', tourCount: 340 },
  { id: 'g27', name: 'Rotterdam', country: 'Netherlands', image: 'https://images.unsplash.com/photo-1567000833660-57e4cf898f8c?w=600&h=400&fit=crop', tourCount: 95 },

  // Portugal
  { id: 'g28', name: 'Lisbon', country: 'Portugal', image: 'https://images.unsplash.com/photo-1585255318859-f5c15f4cffe9?w=600&h=400&fit=crop', tourCount: 275 },
  { id: 'g29', name: 'Porto', country: 'Portugal', image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop', tourCount: 185 },
  { id: 'g30', name: 'Algarve', country: 'Portugal', image: 'https://images.unsplash.com/photo-1566501206188-5dd0cf160a0e?w=600&h=400&fit=crop', tourCount: 125 },

  // Czech Republic
  { id: 'g31', name: 'Prague', country: 'Czech Republic', image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=600&h=400&fit=crop', tourCount: 210 },
  { id: 'g32', name: 'Český Krumlov', country: 'Czech Republic', image: 'https://images.unsplash.com/photo-1575538439802-1e5e9e3c6c12?w=600&h=400&fit=crop', tourCount: 65 },

  // Switzerland
  { id: 'g33', name: 'Interlaken', country: 'Switzerland', image: 'https://images.unsplash.com/photo-1527668752968-14ce70a6d7ea?w=600&h=400&fit=crop', tourCount: 184 },
  { id: 'g34', name: 'Zurich', country: 'Switzerland', image: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=600&h=400&fit=crop', tourCount: 155 },
  { id: 'g35', name: 'Lucerne', country: 'Switzerland', image: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=600&h=400&fit=crop', tourCount: 120 },
  { id: 'g36', name: 'Zermatt', country: 'Switzerland', image: 'https://images.unsplash.com/photo-1529983867735-43d0a28c0c18?w=600&h=400&fit=crop', tourCount: 95 },

  // Other Europe
  { id: 'g37', name: 'Dubrovnik', country: 'Croatia', image: 'https://images.unsplash.com/photo-1555990538-2df8b1be4bdc?w=600&h=400&fit=crop', tourCount: 165 },
  { id: 'g38', name: 'Split', country: 'Croatia', image: 'https://images.unsplash.com/photo-1569597888533-e5c4d0b7c3f3?w=600&h=400&fit=crop', tourCount: 110 },
  { id: 'g39', name: 'Vienna', country: 'Austria', image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=600&h=400&fit=crop', tourCount: 295 },
  { id: 'g40', name: 'Salzburg', country: 'Austria', image: 'https://images.unsplash.com/photo-1582711012124-a56cf82307a0?w=600&h=400&fit=crop', tourCount: 165 },
  { id: 'g41', name: 'Budapest', country: 'Hungary', image: 'https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=600&h=400&fit=crop', tourCount: 255 },
  { id: 'g42', name: 'Reykjavik', country: 'Iceland', image: 'https://images.unsplash.com/photo-1521193089946-7aa29d1fe776?w=600&h=400&fit=crop', tourCount: 156 },
  { id: 'g43', name: 'Copenhagen', country: 'Denmark', image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=600&h=400&fit=crop', tourCount: 195 },
  { id: 'g44', name: 'Stockholm', country: 'Sweden', image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=600&h=400&fit=crop', tourCount: 170 },
  { id: 'g45', name: 'Oslo', country: 'Norway', image: 'https://images.unsplash.com/photo-1523978749193-19e0ded51ca5?w=600&h=400&fit=crop', tourCount: 130 },
  { id: 'g46', name: 'Helsinki', country: 'Finland', image: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=600&h=400&fit=crop', tourCount: 110 },
  { id: 'g47', name: 'Brussels', country: 'Belgium', image: 'https://images.unsplash.com/photo-1559113202-c916b8e44373?w=600&h=400&fit=crop', tourCount: 145 },
  { id: 'g48', name: 'Warsaw', country: 'Poland', image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=600&h=400&fit=crop', tourCount: 135 },
  { id: 'g49', name: 'Krakow', country: 'Poland', image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=400&fit=crop', tourCount: 175 },
  { id: 'g50', name: 'Dublin', country: 'Ireland', image: 'https://images.unsplash.com/photo-1549918864-48ac978761a4?w=600&h=400&fit=crop', tourCount: 220 },
  { id: 'g50a', name: 'Monte Carlo', country: 'Monaco', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop', tourCount: 78 },
  { id: 'g50b', name: 'Valletta', country: 'Malta', image: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=600&h=400&fit=crop', tourCount: 95 },
  { id: 'g50c', name: 'Luxembourg City', country: 'Luxembourg', image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=400&fit=crop', tourCount: 65 },
  { id: 'g50d', name: 'Kotor', country: 'Montenegro', image: 'https://images.unsplash.com/photo-1555990538-2df8b1be4bdc?w=600&h=400&fit=crop', tourCount: 72 },
  { id: 'g50e', name: 'Tallinn', country: 'Estonia', image: 'https://images.unsplash.com/photo-1559511260-66a68e7c2a2d?w=600&h=400&fit=crop', tourCount: 88 },
  { id: 'g50f', name: 'Riga', country: 'Latvia', image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=600&h=400&fit=crop', tourCount: 75 },
  { id: 'g50g', name: 'Vilnius', country: 'Lithuania', image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=600&h=400&fit=crop', tourCount: 82 },
  { id: 'g50h', name: 'Ljubljana', country: 'Slovenia', image: 'https://images.unsplash.com/photo-1555990538-2df8b1be4bdc?w=600&h=400&fit=crop', tourCount: 68 },
  { id: 'g50i', name: 'Bucharest', country: 'Romania', image: 'https://images.unsplash.com/photo-1549918864-48ac978761a4?w=600&h=400&fit=crop', tourCount: 92 },
  { id: 'g50j', name: 'Sofia', country: 'Bulgaria', image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=600&h=400&fit=crop', tourCount: 78 },

  // ══════════════════════════ ASIA ══════════════════════════
  // India
  { id: 'g51', name: 'Jaipur', country: 'India', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&h=400&fit=crop', tourCount: 310 },
  { id: 'g52', name: 'Agra', country: 'India', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop', tourCount: 285 },
  { id: 'g53', name: 'Varanasi', country: 'India', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&h=400&fit=crop', tourCount: 195 },
  { id: 'g54', name: 'Goa', country: 'India', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop', tourCount: 230 },
  { id: 'g55', name: 'Kerala', country: 'India', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=400&fit=crop', tourCount: 175 },
  { id: 'g56', name: 'Delhi', country: 'India', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=400&fit=crop', tourCount: 350 },
  { id: 'g57', name: 'Mumbai', country: 'India', image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&h=400&fit=crop', tourCount: 280 },
  { id: 'g58', name: 'Udaipur', country: 'India', image: 'https://images.unsplash.com/photo-1524309205094-d0e695753cf0?w=600&h=400&fit=crop', tourCount: 145 },
  { id: 'g59', name: 'Shimla', country: 'India', image: 'https://images.unsplash.com/photo-1597074866923-dc0589150458?w=600&h=400&fit=crop', tourCount: 90 },
  { id: 'g60', name: 'Rishikesh', country: 'India', image: 'https://images.unsplash.com/photo-1592385263014-b8aa6e4e0c82?w=600&h=400&fit=crop', tourCount: 110 },
  { id: 'g61', name: 'Ladakh', country: 'India', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=400&fit=crop', tourCount: 75 },
  { id: 'g62', name: 'Manali', country: 'India', image: 'https://images.unsplash.com/photo-1626621341431-05b5b29d064c?w=600&h=400&fit=crop', tourCount: 95 },

  // Japan
  { id: 'g63', name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop', tourCount: 389 },
  { id: 'g64', name: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop', tourCount: 215 },
  { id: 'g65', name: 'Osaka', country: 'Japan', image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=600&h=400&fit=crop', tourCount: 195 },
  { id: 'g66', name: 'Hiroshima', country: 'Japan', image: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=600&h=400&fit=crop', tourCount: 120 },

  // Thailand
  { id: 'g67', name: 'Bangkok', country: 'Thailand', image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=600&h=400&fit=crop', tourCount: 420 },
  { id: 'g68', name: 'Phuket', country: 'Thailand', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&h=400&fit=crop', tourCount: 280 },
  { id: 'g69', name: 'Chiang Mai', country: 'Thailand', image: 'https://images.unsplash.com/photo-1512553785098-6f6ace224b02?w=600&h=400&fit=crop', tourCount: 210 },
  { id: 'g70', name: 'Krabi', country: 'Thailand', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop', tourCount: 165 },

  // Indonesia
  { id: 'g71', name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop', tourCount: 312 },
  { id: 'g72', name: 'Jakarta', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=600&h=400&fit=crop', tourCount: 140 },
  { id: 'g73', name: 'Yogyakarta', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&h=400&fit=crop', tourCount: 175 },

  // Vietnam
  { id: 'g74', name: 'Hanoi', country: 'Vietnam', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&h=400&fit=crop', tourCount: 156 },
  { id: 'g75', name: 'Ho Chi Minh City', country: 'Vietnam', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&h=400&fit=crop', tourCount: 190 },
  { id: 'g76', name: 'Ha Long Bay', country: 'Vietnam', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&h=400&fit=crop', tourCount: 220 },

  // Other Asia
  { id: 'g77', name: 'Seoul', country: 'South Korea', image: 'https://images.unsplash.com/photo-1515861461225-1488dfdaf0a8?w=600&h=400&fit=crop', tourCount: 230 },
  { id: 'g78', name: 'Busan', country: 'South Korea', image: 'https://images.unsplash.com/photo-1618824834717-1c55d3a3e9db?w=600&h=400&fit=crop', tourCount: 115 },
  { id: 'g79', name: 'Singapore', country: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop', tourCount: 310 },
  { id: 'g80', name: 'Kuala Lumpur', country: 'Malaysia', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=400&fit=crop', tourCount: 245 },
  { id: 'g81', name: 'Langkawi', country: 'Malaysia', image: 'https://images.unsplash.com/photo-1592979011259-57c60e3ad254?w=600&h=400&fit=crop', tourCount: 95 },
  { id: 'g82', name: 'Maldives', country: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop', tourCount: 120 },
  { id: 'g83', name: 'Colombo', country: 'Sri Lanka', image: 'https://images.unsplash.com/photo-1588598198321-9735fd5b057a?w=600&h=400&fit=crop', tourCount: 135 },
  { id: 'g84', name: 'Kathmandu', country: 'Nepal', image: 'https://images.unsplash.com/photo-1558799401-1dcba79834c2?w=600&h=400&fit=crop', tourCount: 165 },
  { id: 'g85', name: 'Siem Reap', country: 'Cambodia', image: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&h=400&fit=crop', tourCount: 190 },
  { id: 'g86', name: 'Manila', country: 'Philippines', image: 'https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=600&h=400&fit=crop', tourCount: 135 },
  { id: 'g87', name: 'Palawan', country: 'Philippines', image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&h=400&fit=crop', tourCount: 110 },

  // Middle East
  { id: 'g88', name: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop', tourCount: 345 },
  { id: 'g89', name: 'Abu Dhabi', country: 'UAE', image: 'https://images.unsplash.com/photo-1569288063477-a29a1e5e17e5?w=600&h=400&fit=crop', tourCount: 195 },
  { id: 'g90', name: 'Istanbul', country: 'Turkey', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=400&fit=crop', tourCount: 410 },
  { id: 'g91', name: 'Cappadocia', country: 'Turkey', image: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=600&h=400&fit=crop', tourCount: 185 },
  { id: 'g92', name: 'Petra', country: 'Jordan', image: 'https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=600&h=400&fit=crop', tourCount: 110 },
  { id: 'g93', name: 'Jerusalem', country: 'Israel', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop', tourCount: 215 },
  { id: 'g94', name: 'Muscat', country: 'Oman', image: 'https://images.unsplash.com/photo-1597040663342-45b6ba68fa2d?w=600&h=400&fit=crop', tourCount: 85 },

  // China
  { id: 'g95', name: 'Beijing', country: 'China', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&h=400&fit=crop', tourCount: 380 },
  { id: 'g96', name: 'Shanghai', country: 'China', image: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=600&h=400&fit=crop', tourCount: 290 },
  { id: 'g97', name: 'Hong Kong', country: 'China', image: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=600&h=400&fit=crop', tourCount: 325 },
  { id: 'g98', name: 'Guilin', country: 'China', image: 'https://images.unsplash.com/photo-1537531383496-f4749b04a764?w=600&h=400&fit=crop', tourCount: 95 },

  // ══════════════════════════ AFRICA ══════════════════════════
  { id: 'g99', name: 'Cape Town', country: 'South Africa', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&h=400&fit=crop', tourCount: 184 },
  { id: 'g100', name: 'Johannesburg', country: 'South Africa', image: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=600&h=400&fit=crop', tourCount: 125 },
  { id: 'g101', name: 'Marrakech', country: 'Morocco', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&h=400&fit=crop', tourCount: 195 },
  { id: 'g102', name: 'Fez', country: 'Morocco', image: 'https://images.unsplash.com/photo-1548017469-0b0f4a348fea?w=600&h=400&fit=crop', tourCount: 110 },
  { id: 'g103', name: 'Cairo', country: 'Egypt', image: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=600&h=400&fit=crop', tourCount: 150 },
  { id: 'g104', name: 'Luxor', country: 'Egypt', image: 'https://images.unsplash.com/photo-1568322445389-f64e1bbee570?w=600&h=400&fit=crop', tourCount: 120 },
  { id: 'g105', name: 'Serengeti', country: 'Tanzania', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop', tourCount: 85 },
  { id: 'g106', name: 'Zanzibar', country: 'Tanzania', image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=600&h=400&fit=crop', tourCount: 95 },
  { id: 'g107', name: 'Nairobi', country: 'Kenya', image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&h=400&fit=crop', tourCount: 160 },
  { id: 'g108', name: 'Maasai Mara', country: 'Kenya', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&h=400&fit=crop', tourCount: 130 },
  { id: 'g109', name: 'Victoria Falls', country: 'Zimbabwe', image: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?w=600&h=400&fit=crop', tourCount: 75 },
  { id: 'g110', name: 'Mahe', country: 'Seychelles', image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600&h=400&fit=crop', tourCount: 42 },
  { id: 'g111', name: 'Mauritius', country: 'Mauritius', image: 'https://images.unsplash.com/photo-1586523969691-d3544fcbceb0?w=600&h=400&fit=crop', tourCount: 65 },
  { id: 'g112', name: 'Addis Ababa', country: 'Ethiopia', image: 'https://images.unsplash.com/photo-1574950578143-858c6fc78773?w=600&h=400&fit=crop', tourCount: 55 },
  { id: 'g113', name: 'Lagos', country: 'Nigeria', image: 'https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?w=600&h=400&fit=crop', tourCount: 70 },

  // ══════════════════════════ NORTH AMERICA ══════════════════════════
  // USA
  { id: 'g114', name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop', tourCount: 623 },
  { id: 'g115', name: 'Los Angeles', country: 'USA', image: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed?w=600&h=400&fit=crop', tourCount: 420 },
  { id: 'g116', name: 'San Francisco', country: 'USA', image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400&fit=crop', tourCount: 310 },
  { id: 'g117', name: 'Las Vegas', country: 'USA', image: 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=600&h=400&fit=crop', tourCount: 275 },
  { id: 'g118', name: 'Miami', country: 'USA', image: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=600&h=400&fit=crop', tourCount: 290 },
  { id: 'g119', name: 'Grand Canyon', country: 'USA', image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=600&h=400&fit=crop', tourCount: 145 },
  { id: 'g120', name: 'Hawaii', country: 'USA', image: 'https://images.unsplash.com/photo-1507876466758-bc54f384809c?w=600&h=400&fit=crop', tourCount: 235 },
  { id: 'g121', name: 'Washington DC', country: 'USA', image: 'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=600&h=400&fit=crop', tourCount: 260 },
  { id: 'g122', name: 'Chicago', country: 'USA', image: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=600&h=400&fit=crop', tourCount: 220 },

  // Canada
  { id: 'g123', name: 'Banff', country: 'Canada', image: 'https://images.unsplash.com/photo-1523315748882-938ed9944a90?w=600&h=400&fit=crop', tourCount: 190 },
  { id: 'g124', name: 'Vancouver', country: 'Canada', image: 'https://images.unsplash.com/photo-1559511260-66a68e7c2a2d?w=600&h=400&fit=crop', tourCount: 245 },
  { id: 'g125', name: 'Toronto', country: 'Canada', image: 'https://images.unsplash.com/photo-1517090504332-cc3bcb9a0050?w=600&h=400&fit=crop', tourCount: 210 },
  { id: 'g126', name: 'Niagara Falls', country: 'Canada', image: 'https://images.unsplash.com/photo-1489447068241-b3490214e879?w=600&h=400&fit=crop', tourCount: 155 },
  { id: 'g127', name: 'Quebec City', country: 'Canada', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', tourCount: 110 },

  // Mexico
  { id: 'g128', name: 'Cancun', country: 'Mexico', image: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=600&h=400&fit=crop', tourCount: 315 },
  { id: 'g129', name: 'Mexico City', country: 'Mexico', image: 'https://images.unsplash.com/photo-1518659526054-190340b32735?w=600&h=400&fit=crop', tourCount: 280 },
  { id: 'g130', name: 'Tulum', country: 'Mexico', image: 'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=600&h=400&fit=crop', tourCount: 195 },
  { id: 'g131', name: 'Oaxaca', country: 'Mexico', image: 'https://images.unsplash.com/photo-1585923358752-20ac31199080?w=600&h=400&fit=crop', tourCount: 110 },

  // Caribbean
  { id: 'g132', name: 'Havana', country: 'Cuba', image: 'https://images.unsplash.com/photo-1508108712903-49b7ef9b1df8?w=600&h=400&fit=crop', tourCount: 125 },
  { id: 'g133', name: 'Montego Bay', country: 'Jamaica', image: 'https://images.unsplash.com/photo-1533027246329-8bc981bc8b6c?w=600&h=400&fit=crop', tourCount: 85 },

  // ══════════════════════════ SOUTH AMERICA ══════════════════════════
  { id: 'g134', name: 'Rio de Janeiro', country: 'Brazil', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&h=400&fit=crop', tourCount: 220 },
  { id: 'g135', name: 'São Paulo', country: 'Brazil', image: 'https://images.unsplash.com/photo-1554168848-12c88ac0f006?w=600&h=400&fit=crop', tourCount: 175 },
  { id: 'g136', name: 'Salvador', country: 'Brazil', image: 'https://images.unsplash.com/photo-1580213131667-c6f4aec9efe3?w=600&h=400&fit=crop', tourCount: 110 },
  { id: 'g137', name: 'Cusco', country: 'Peru', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&h=400&fit=crop', tourCount: 140 },
  { id: 'g138', name: 'Machu Picchu', country: 'Peru', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&h=400&fit=crop', tourCount: 195 },
  { id: 'g139', name: 'Lima', country: 'Peru', image: 'https://images.unsplash.com/photo-1531968455001-5c5272a67c71?w=600&h=400&fit=crop', tourCount: 155 },
  { id: 'g140', name: 'Buenos Aires', country: 'Argentina', image: 'https://images.unsplash.com/photo-1612450849202-b43e813a30c8?w=600&h=400&fit=crop', tourCount: 175 },
  { id: 'g141', name: 'Patagonia', country: 'Argentina', image: 'https://images.unsplash.com/photo-1551279880-03af43dae5b5?w=600&h=400&fit=crop', tourCount: 85 },
  { id: 'g142', name: 'Bogotá', country: 'Colombia', image: 'https://images.unsplash.com/photo-1568385247005-0d371d214707?w=600&h=400&fit=crop', tourCount: 140 },
  { id: 'g143', name: 'Cartagena', country: 'Colombia', image: 'https://images.unsplash.com/photo-1583531352515-8884af319dc7?w=600&h=400&fit=crop', tourCount: 165 },
  { id: 'g144', name: 'Santiago', country: 'Chile', image: 'https://images.unsplash.com/photo-1544413164-5f1b361f5baf?w=600&h=400&fit=crop', tourCount: 130 },
  { id: 'g145', name: 'Quito', country: 'Ecuador', image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=600&h=400&fit=crop', tourCount: 105 },
  { id: 'g146', name: 'Galápagos Islands', country: 'Ecuador', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop', tourCount: 75 },
  { id: 'g147', name: 'San Jose', country: 'Costa Rica', image: 'https://images.unsplash.com/photo-1623999490159-fbba117b08ee?w=600&h=400&fit=crop', tourCount: 165 },

  // ══════════════════════════ OCEANIA ══════════════════════════
  { id: 'g148', name: 'Sydney', country: 'Australia', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&h=400&fit=crop', tourCount: 310 },
  { id: 'g149', name: 'Melbourne', country: 'Australia', image: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=600&h=400&fit=crop', tourCount: 245 },
  { id: 'g150', name: 'Great Barrier Reef', country: 'Australia', image: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=600&h=400&fit=crop', tourCount: 175 },
  { id: 'g151', name: 'Uluru', country: 'Australia', image: 'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=600&h=400&fit=crop', tourCount: 65 },
  { id: 'g152', name: 'Queenstown', country: 'New Zealand', image: 'https://images.unsplash.com/photo-1589801124699-281b3cc767ea?w=600&h=400&fit=crop', tourCount: 145 },
  { id: 'g153', name: 'Auckland', country: 'New Zealand', image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&h=400&fit=crop', tourCount: 175 },
  { id: 'g154', name: 'Milford Sound', country: 'New Zealand', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop', tourCount: 85 },
  { id: 'g155', name: 'Bora Bora', country: 'French Polynesia', image: 'https://images.unsplash.com/photo-1589979481223-deb8930430fa?w=600&h=400&fit=crop', tourCount: 65 },
  { id: 'g156', name: 'Nadi', country: 'Fiji', image: 'https://images.unsplash.com/photo-1540835296355-c05282914106?w=600&h=400&fit=crop', tourCount: 88 },
];

// Helper: Get all unique countries
export function getAllCountries(): string[] {
  return [...new Set(globalDestinations.map(d => d.country))].sort();
}

// Helper: Get destinations by country
export function getDestinationsByCountry(country: string): Destination[] {
  return globalDestinations.filter(d => d.country.toLowerCase() === country.toLowerCase());
}

// Helper: Search destinations by query
export function searchDestinations(query: string): Destination[] {
  const q = query.toLowerCase();
  return globalDestinations.filter(
    d => d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q)
  );
}

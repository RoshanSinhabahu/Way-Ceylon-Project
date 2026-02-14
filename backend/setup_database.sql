CREATE DATABASE IF NOT EXISTS way_ceylon;
USE way_ceylon;

CREATE TABLE IF NOT EXISTS destinations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    duration INT NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    image TEXT,
    description TEXT,
    lat DECIMAL(10, 6),
    lon DECIMAL(10, 6)
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS saved_itineraries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    itinerary JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO destinations (name, category, duration, cost, image, description, lat, lon) VALUES
('Sigiriya Rock Fortress', 'culture', 1, 4000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Sigiriya_%28141688197%29.jpeg/1200px-Sigiriya_%28141688197%29.jpeg', 'Ancient rock fortress with royal gardens and breathtaking views.', 7.9575, 80.7600),
('Kandy Temple of the Tooth', 'culture', 1, 2500, 'https://whc.unesco.org/uploads/thumbs/site_0450_0020-1200-630-20151105154018.jpg', 'Sacred Buddhist temple that houses the tooth relic of Lord Buddha.', 7.2906, 80.6337),
('Anuradhapura', 'culture', 2, 3500, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1533888386047/shutterstock-307224302_destinationMain_1533888398803.jpeg', 'Ancient capital with centuries-old stupas and monasteries.', 8.3114, 80.4037),
('Polonnaruwa Ancient City', 'culture', 2, 3200, 'https://media.istockphoto.com/id/824016044/photo/vintage-colour-effect-of-polonnaruwa-ancient-vatadage.jpg?s=612x612&w=0&k=20&c=8xPi05YUMvle7Y2Xz3y0Gspk-ZhYnyf9N4Z8Rytwp10=', 'UNESCO World Heritage site with ancient palaces and temples.', 7.9397, 81.0000),
('Dambulla Cave Temple', 'culture', 1, 2200, 'https://www.historyhit.com/app/uploads/bis-images/5163366/shutterstock_Dambulla-Cave-Temple-1-788x537.jpg?x81146', 'Famous cave temple with ancient Buddha statues and murals.', 7.8564, 80.6490),
('Galle Fort', 'culture', 1, 2000, 'https://do6raq9h04ex.cloudfront.net/sites/8/2021/07/galle-fort-1050x700-1.jpg', 'UNESCO heritage fort with colonial charm and ocean views.', 6.0320, 80.2167),
('Jaffna Fort', 'culture', 1, 2000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Jaffna_Fort_%281%29.jpg/500px-Jaffna_Fort_%281%29.jpg', 'Historical fort built by the Portuguese, later expanded by Dutch.', 9.6615, 80.0255),
('Matale Spice Garden', 'culture', 1, 1800, 'https://dea.gov.lk/wp-content/uploads/2022/03/img11.jpg', 'Explore aromatic spices and traditional herbal remedies.', 7.4667, 80.6167),
('National Museum Colombo', 'culture', 1, 1200, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/SL_Colombo_asv2020-01_img10_National_Museum.jpg/1200px-SL_Colombo_asv2020-01_img10_National_Museum.jpg', 'Largest museum in Sri Lanka showcasing artifacts and history.', 6.9271, 79.8612),
('Independence Memorial Hall', 'culture', 1, 1000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Independence_Commemoration_Hall.jpg/1280px-Independence_Commemoration_Hall.jpg', 'Historical landmark built to commemorate Sri Lanka''s independence.', 6.9271, 79.8625),
('Mirissa Beach', 'beach', 2, 5000, 'https://digitaltravelcouple.com/wp-content/uploads/2020/01/mirissa-beach-sri-lanka-1.jpg', 'Perfect for whale watching, surfing, and golden sunsets.', 5.9489, 80.4540),
('Arugam Bay', 'beach', 3, 6500, 'https://tuktukrental.com/arugam-bay-travel-guide-sri-lanka/', 'World-famous surf spot with a chill tropical vibe.', 6.8413, 81.6980),
('Bentota Beach', 'beach', 2, 4000, 'https://travel.com/wp-content/uploads/2025/09/Aerial-view-of-Bentota-Beach-where-the-river-meets-the-Indian-Ocean-on-a-sunny-day-in-Sri-Lanka.webp', 'Golden sands, calm seas, and luxury beach resorts.', 6.4250, 80.0070),
('Unawatuna Beach', 'beach', 1, 3000, 'https://www.wondersofceylon.com/content/images/2024/01/WoC-Unawatuna-Beach-Featured.webp', 'Popular beach for swimming and snorkeling.', 6.0322, 80.2470),
('Nilaveli Beach', 'beach', 1, 2800, 'https://digitaltravelcouple.com/wp-content/uploads/2019/12/nilaveli-beach-sunrise.jpg', 'Beautiful white sand beach near Pigeon Island National Park.', 8.9200, 81.2320),
('Trincomalee Beach', 'beach', 1, 2900, 'https://www.thecoastalcampaign.com/wp-content/uploads/2019/10/DJI_0207-2.jpg', 'Coastal city with calm beaches and diving spots.', 8.5870, 81.2150),
('Kalpitiya Beach', 'beach', 2, 3500, 'https://d3sftlgbtusmnv.cloudfront.net/blog/wp-content/uploads/2024/08/Kalpitiya-Beach-Cover-Photo-840x425.jpg', 'Ideal for kitesurfing and dolphin watching.', 8.0833, 79.7667),
('Hikkaduwa Beach', 'beach', 1, 2700, 'https://ceylonclassictours.com/wp-content/uploads/2023/09/hikkaduwa-beach.jpg', 'Coral reefs, surfing, and nightlife spot.', 6.1425, 80.1044),
('Uppuveli Beach', 'beach', 1, 2800, 'https://mediaim.expedia.com/destination/2/9b6649642a3d0df92f0616497e0b5e00.jpg', 'Tranquil beach with soft sands and clear water.', 8.6000, 81.2500),
('Tangalle Beach', 'beach', 2, 4000, 'https://nerdnomads.com/wp-content/uploads/2014/03/DSC3444.jpg', 'Secluded beach with palm-lined coastline.', 6.0100, 80.7900),
('Ella', 'nature', 1, 3000, 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1228', 'Charming hill town surrounded by misty mountains and tea estates.', 6.8390, 81.0440),
('Nuwara Eliya', 'nature', 2, 4500, 'https://media.istockphoto.com/id/510481818/photo/waterfall-valley-near-nuwara-eliya-sri-lanka.jpg?s=612x612&w=0&k=20&c=d4Hqe_BQ_-1y1QLCAPlj5vLJ8zgpgnBX1JiJMDeKiEI=', 'Known as ''Little England'', famous for tea gardens and cool weather.', 6.9700, 80.7890),
('Horton Plains', 'nature', 1, 3500, 'https://www.srilankanexpeditions.co.uk/images/sri-lanka-guide/horton-plains-national-park/01.jpg', 'Scenic plateau with World’s End cliff and rich biodiversity.', 6.8000, 80.7700),
('Adam''s Peak', 'nature', 2, 3500, 'https://www.ceylonexpeditions.com/medias/destination_places/big/110/sri-pada-adam-s-peak-sri-lanka.jpg', 'Famous pilgrimage mountain with sunrise views.', 6.8110, 80.4890),
('Knuckles Mountain Range', 'nature', 2, 4000, 'https://i0.wp.com/amazinglanka.com/wp/wp-content/uploads/2014/09/knuckles-01.jpg?fit=800%2C450&ssl=1', 'Hiking destination with lush forests and rivers.', 7.4333, 80.7667),
('Sinharaja Forest Reserve', 'nature', 2, 3800, 'https://theportuguesetraveler.com/wp-content/uploads/2024/11/sinharaja-forest-reserve-rainforest-sri-lanka-137.jpg.webp', 'UNESCO World Heritage rainforest with rich biodiversity.', 6.3710, 80.4500),
('Victoria Reservoir', 'nature', 1, 1500, 'https://img.freepik.com/premium-photo/victoria-reservoir-kandy-sri-lanka_114775-433.jpg', 'Scenic reservoir surrounded by mountains and forests.', 7.5000, 80.7667),
('Ravana Falls', 'nature', 1, 800, 'https://digitaltravelcouple.com/wp-content/uploads/2019/12/ravana-falls-sri-lanka-pool.jpg?ezimgfmt=rs:767x479/rscb19/ng:webp/ngcb19', 'Famous waterfall near Ella.', 6.8700, 81.0400),
('Lipton''s Seat', 'nature', 1, 1200, 'https://www.orienthotelsl.com/wp-content/uploads/2023/01/Hike-to-Liptons-seat-800x600-1.webp', 'Viewpoint overlooking tea plantations.', 6.8830, 80.9550),
('Seetha Eliya', 'nature', 1, 800, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/6c/e0/df/the-kovil-at-the-roadside.jpg?w=900&h=500&s=1', 'Small scenic village with natural attractions.', 6.9667, 80.7667),
('Kitulgala White Water Rafting', 'adventure', 1, 5500, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/1e/ce/a3.jpg', 'Thrilling white-water rafting through tropical rainforests.', 6.9667, 80.6000),
('Safari in Yala National Park', 'adventure', 2, 8000, 'https://www.22weligambay.com/images/experiences/yala-national-park/yala-slider1.jpg', 'Sri Lanka’s most famous wildlife park—leopards, elephants & more.', 6.3590, 81.5300),
('Ziplining in Kandy', 'adventure', 1, 2000, 'https://media.tacdn.com/media/attractions-splice-spp-674x446/11/67/35/3f.jpg', 'Adrenaline-pumping zipline with panoramic hill views.', 7.2906, 80.6337),
('Knuckles Trekking', 'adventure', 2, 4500, 'https://thema-collection.imgix.net/sites/14/2025/05/High-Knuckles-Glamping-in-Sri-Lanka.jpg?w=940&h=760&&fit=crop&crop=center&auto=format,enhance&q=25', 'Challenging treks with amazing views.', 7.4333, 80.7667),
('Haputale Hiking', 'adventure', 1, 2500, 'https://www.srilankanexpeditions.com/images/destinations-in-sri-lanka/best-things-to-do-in-haputale/best-things-to-do-in-haputale-01.jpg', 'Hiking trails with stunning hill country views.', 6.7700, 80.9930),
('Udawalawe Safari', 'adventure', 1, 3000, 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/0b/2a/7c.jpg', 'Safari park famous for elephants and wildlife.', 6.4500, 81.0900),
('Ella Rock Climb', 'adventure', 1, 2000, 'https://www.srilankainstyle.com/storage/app/media/Experiences/Ella%20Rock%20Climb/Ella-Rock-Climb-slider-4.jpg', 'Moderate rock climb with scenic views.', 6.8440, 81.0460),
('Kitulgala Canopy Tour', 'adventure', 1, 2800, 'https://www.kitulgalaadventures.com/booking/package_img/1468494410jump4.jpg', 'Zipline and canopy adventure in lush forest.', 6.9667, 80.6000),
('Surfing in Arugam Bay', 'adventure', 2, 4000, 'https://www.srilankainstyle.com/storage/app/media/Experiences/Surfs%20up%20in%20Arugam%20Bay/Surfs-up-in-Arugam-Bay-slider-4.jpg', 'World-class surfing destination.', 6.8413, 81.6980),
('Mountain Biking in Nuwara Eliya', 'adventure', 1, 1800, 'https://lakpura.com/cdn/shop/products/LKI7217391-04-E.jpg?v=1679987301&width=1445', 'Adventure biking trails through tea estates.', 6.9700, 80.7890);

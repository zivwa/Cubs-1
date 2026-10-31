export type Product = {
  id: string;
  name: string;
  category: string;
  price: number | null;
  description: string;
  available: boolean;
  archived?: boolean;
  image: string;
  variants?: string;
  cake?: boolean;
};
const groups: Record<string, [string, number][]> = {
  Pastries: [
    ["Eggless Fresh Fruit Pastry Cake", 1100],
    ["Eggless Rasmalai Pastry", 1320],
    ["Eggless White Forest", 935],
    ["Chocolate Blueberry Cake", 1100],
    ["Black Current Pastry Cake", 550],
    ["Pineapple Pastry Cake", 90],
    ["Chocolate Strawberry Pastry Cake", 990],
    ["Eggless Kiwi Pastry Cake", 660],
    ["German Black Forest Pastry Cake", 170],
    ["Eggless Chocolate Litchi Pastry Cake", 1100],
    ["Eggless Chocolate Strawberry Pastry Cake", 1100],
    ["Eggless Chocolate Delight Pastry Cake", 935],
    ["Eggless Choco Truffle Pastry Cake [1 Pcs]", 160],
    ["Black Forest Pastry Cake", 130],
    ["Kiwi Pastry Cake", 550],
    ["Blue Berry Pastry Cake", 165],
  ],
  "Quick bites & muffins": [
    ["Eggless Pineapple Muffin", 100],
    ["Chocolate Brownie [1 Pcs]", 160],
    ["Tres Leches Cake", 250],
    ["Eggless Blueberry Muffins", 120],
    ["Eggless Vanilla With Chocochips Muffin", 120],
    ["Eggless Strawberry Muffin", 100],
    ["Chocolate Muffin [1 Pcs]", 70],
    ["Vanilla Muffin [1 Pcs]", 60],
  ],
  Cookies: [
    ["Fruit Nut Cookies", 55],
    ["Jam Cookies", 55],
    ["Curry Leaves Cookies Eggless", 65],
    ["Salt Cookies Eggless", 50],
    ["Masala Cookies Eggless", 55],
    ["Cashewnut Cookies", 130],
    ["Choco Chips Cookies", 55],
    ["Butter Cookies Eggless", 50],
    ["Almond Stick Cookies Eggless", 100],
  ],
  "Bread & buns": [
    ["Milk Bread", 55],
    ["Plain Rusk", 95],
    ["Brown Bread", 65],
    ["Hot Dog Bun [2 In 1 Pk]", 55],
    ["Wheat Rusk", 105],
  ],
  "Cold beverages": [
    ["Oreo Chocolate Smoothie", 220],
    ["Mango Smoothie", 200],
    ["Blood Orange", 220],
    ["Cold Coffee", 200],
    ["Peach Iced Tea", 200],
    ["Butterscotch Smoothie", 200],
    ["Vanilla Smoothie", 200],
  ],
  Pasta: [
    ["Penne Pasta Non Veg", 420],
    ["Penne Spicy Tomato Pasta Non Veg", 440],
    ["Veg Lasagna", 440],
    ["Penne Pasta Veg", 400],
    ["Pink Sauce Pasta Non Veg", 420],
    ["Chicken Lasagna", 480],
    ["Penne Spicy Tomato Pasta Veg", 400],
  ],
  Salads: [
    ["Chinese Chicken Salad", 360],
    ["Periperi Chicken Salad", 360],
    ["Asian Chicken Salad", 340],
    ["Oriental Salad", 320],
    ["Greek Salad", 300],
    ["Summer Salad", 340],
    ["Chicken Tikka Salad", 340],
    ["Bbq Chicken Salad", 360],
    ["Caribbean Chicken Salad", 360],
    ["Egg Salad", 360],
    ["Russian Salad", 340],
    ["Chicken Caesar Salad", 340],
  ],
  "Non veg appetizers": [
    ["Fish And Chips", 440],
    ["Grilled Fish", 440],
    ["Fish Fingers", 420],
    ["Fried Chicken With Fries", 380],
    ["Chicken Cheese Cigar Roll", 420],
    ["Chicken Tempura", 360],
    ["Grilled Prawns", 510],
  ],
  "Veg sandwiches": [
    ["Classic Vegetable Sandwich", 280],
    ["Clt Sandwich", 210],
    ["Club Sandwich Veg With Fries", 290],
    ["Spinach Corn Sandwich With Fries", 300],
    ["Paneer Tikka Sandwich", 280],
    ["Corn Veg Coleslaw Cheese Sandwich", 300],
  ],
  Soups: [
    ["Spinach Corn Soup", 260],
    ["Chicken Clear Soup", 260],
    ["Hot And Sour Chicken Soup", 300],
    ["Sweet Corn And Chicken Soup", 300],
    ["Manchow Chicken Soup", 320],
    ["Sweet Corn Soup", 240],
    ["Chicken & Corn Broth Soup", 260],
    ["Veg Clear Soup", 240],
  ],
  "Fried rice": [
    ["Chicken Fried Rice", 410],
    ["Chicken Schezwan Fried Rice", 440],
    ["Egg Fried Rice", 390],
    ["Veg Schezwan Fried Rice", 430],
    ["Egg Schezwan Fried Rice", 400],
    ["Veg Fried Rice", 390],
  ],
  "Chicken burgers": [
    ["Double Chicken Burger With Fries", 380],
    ["Crispy Chicken Burger With Fries", 360],
    ["Chicken Burger With Fries", 320],
    ["Grilled Chicken Burger With Fries", 360],
    ["Kofta Chicken Burger With Fries", 380],
  ],
  "Veg appetizers": [
    ["Cheese Chilli Toast", 300],
    ["Crispy Fried Corn", 320],
    ["Paneer Papad Roll", 340],
    ["Crispy Corn Kernels", 280],
    ["French Fries", 240],
    ["Onion Rings", 280],
    ["Mushroom Manchurian", 340],
    ["Mexican Chilli Pops", 350],
  ],
  Pizza: [
    ["Greek Pizza", 290],
    ["Cubs White Pizza", 290],
    ["Tropical Pizza", 290],
    ["Chilly Onion Pizza", 290],
    ["Double Cheese Pizza", 290],
    ["Bbq Chicken Pizza", 290],
    ["Baby Corn Pepper Pizza", 290],
    ["Veg Extra Pizza", 290],
  ],
  "Non veg sandwiches": [
    ["Chicken Tikka Sandwich", 290],
    ["Chicken Club Sandwich", 340],
    ["Capsicum Chicken Sandwich With Fries", 320],
    ["Rosemary Chicken Sandwich With Fries", 340],
    ["Chicken Maya Sandwich With Fries", 280],
    ["Omelette Sandwich With French Fries", 280],
    ["Bbq Chicken Sandwich", 360],
    ["Grilled Chicken Sandwich", 340],
  ],
  Noodles: [
    ["Pan Fried Noodles", 440],
    ["Chicken Noodles", 410],
    ["Veg Schezwan Noodles", 410],
    ["Egg Schezwan Noodles", 410],
    ["Veg Noodles", 360],
    ["Chicken Schezwan Noodles", 440],
    ["Veg Hakka Noodles", 380],
  ],
};
export const photos = {
  cake: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85",
  cookies:
    "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=85",
  bread:
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85",
  coffee:
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=85",
  muffin:
    "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=800&q=85",
  food: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=85",
};
const descriptions: Record<string, string> = {
  "Eggless Rasmalai Pastry":
    "Made with juicy self made rasmalai stuffed in vanilla sponge.",
  "Eggless White Forest":
    "A soft and creamy pastry with the classic flavors of white forest, made eggless.",
  "Tres Leches Cake":
    "A uniquely traditional Latin American cake made of three milks.",
  "Jam Cookies":
    "Crisp butter cookies, baked fresh and crunchy, a sweet treat for any occasion.",
  "Cashewnut Cookies":
    "Crunchy and buttery cookies made with the rich taste of cashewnuts.",
  "Plain Rusk": "Crispy and light, perfect for tea-time or a quick snack.",
  "Wheat Rusk": "Crispy and golden, perfect for snacking or dipping in chai.",
  "Penne Pasta Non Veg":
    "Pine nuts and basil pesto topped with parmesan cheese and served with garlic bread.",
  "Penne Pasta Veg": "Creamy and tasty veg pasta made with penne.",
  "Veg Lasagna": "Layered with soft sheets and a tasty mix.",
  "Chicken Tikka Salad":
    "Chicken tikka, onion, tomato, capsicum with lemon chilli dressing.",
  "Classic Vegetable Sandwich":
    "Bell pepper, corn, cottage cheese, lettuce & cheese, served with French fries.",
  "Cheese Chilli Toast": "3 types of cheese & green chilli.",
  "Fish Fingers": "Marinated & crumb fried, served with tartar sauce & salad.",
  "Chicken & Corn Broth Soup":
    "An Italian soup flavored with thyme, chicken & cream.",
  "Veg Extra Pizza":
    "Onion, capsicum, tomato, corn, mushroom, black olives, jalapeno, red paprika, paneer.",
};
Object.assign(descriptions, {
  "Chinese Chicken Salad":
    "A fresh and crunchy salad made with seasonal vegetables and a light dressing.",
  "Oriental Salad":
    "A fresh and crunchy salad made with seasonal vegetables and a light dressing.",
  "Greek Salad":
    "A fresh and filling veg salad with a mix of Greek-inspired flavors.",
  "Bbq Chicken Salad":
    "BBQ chicken served with crispy fresh veggies or assorted sauce.",
  "Egg Salad":
    "A classic egg salad perfect for a light, satisfying meal or a quick bite.",
  "Russian Salad":
    "A classic veg salad with a creamy mix, perfect for a light and tasty bite.",
  "Chicken Caesar Salad":
    "Lettuce, grilled chicken with Caesar dressing, garlic crouton & Parmesan cheese.",
  "Milk Bread":
    "House-special preparation made with fresh ingredients and authentic spices for a satisfying, flavour-packed bite.",
  "Brown Bread":
    "House-special preparation made with fresh ingredients and authentic spices for a satisfying, flavour-packed bite.",
  "Pink Sauce Pasta Non Veg":
    "Creamy pink sauce pasta with juicy chicken combining rich white sauce and tangy tomato.",
  "Chicken Lasagna":
    "Layers of soft pasta and chicken make this a filling take on classic lasagna.",
  "Mango Smoothie":
    "A chilled mango drink that's creamy and refreshing, perfect for smoothie lovers.",
  "Blood Orange":
    "A refreshing drink with the zesty tang of blood orange, perfect as a passion fruit mocktail.",
  "Cold Coffee":
    "A chill glass of cold coffee, perfect for a quick refreshment any time of day.",
  "Peach Iced Tea":
    "A chilled and fruity peach twist on classic iced tea, perfect for a refreshing sip.",
  "Butterscotch Smoothie":
    "A creamy and sweet butterscotch blend, perfect for a refreshing smoothie treat.",
  "Vanilla Smoothie":
    "A smooth and creamy vanilla drink, perfect for a refreshing break any time.",
  "Black Current Pastry Cake":
    "Soft and fruity pastry with the sweet tang of black currant and a touch of passion fruit.",
  "Pineapple Pastry Cake":
    "Soft, moist pineapple cake with rich frosting, a perfect sweet treat for any occasion.",
  "Black Forest Pastry Cake":
    "Chocolate cake and vanilla cream with chocolate craving and cherries inside n outside.",
  "Fish And Chips":
    "Crispy fried fish served with golden potato chips, perfect for a quick snack or sharing.",
  "Grilled Fish":
    "Soft and flaky fish grilled to perfection, a satisfying choice for dry starters.",
  "Fried Chicken With Fries":
    "Crisp & golden fried chicken served with chipotle mayonnaise & salad.",
  "Chicken Cheese Cigar Roll":
    "Chicken & cheese stuffed in thin roll sheet, deep fried & served with hot garlic sauce.",
  "Chicken Tempura":
    "A flavourful chicken dish prepared with aromatic spices and served piping hot.",
  "Grilled Prawns":
    "Filled prawns served with chips, boiled veg and butter lemon sauce.",
  "Clt Sandwich": "Cucumber, lettuce, tomato & cheese.",
  "Club Sandwich Veg With Fries":
    "3 layered bread with cucumber, lettuce, tomato, veg patty & cheese, served with French fries.",
  "Paneer Tikka Sandwich": "Served with French fries.",
  "Corn Veg Coleslaw Cheese Sandwich": "Filling of coleslaw & cheese.",
  "Spinach Corn Soup":
    "A healthy and tasty soup of spinach and sweet corn, tempered in garlic.",
  "Chicken Clear Soup":
    "A comforting bowl of clear chicken soup, perfect as a light and warming start.",
  "Hot And Sour Chicken Soup":
    "A flavour-packed chicken soup with a warm mix of tangy and peppery notes.",
  "Manchow Chicken Soup":
    "A hearty bowl of chicken soup with a cozy, desi twist that's perfect for any time.",
  "Sweet Corn Soup":
    "A comforting bowl of soup with the classic taste of sweetcorn in every spoonful.",
  "Chicken Fried Rice":
    "A bowl of classic chicken fried rice, perfect for a filling and satisfying meal.",
  "Chicken Schezwan Fried Rice":
    "A bold and tasty fried rice with chicken and the classic Schezwan kick.",
  "Egg Fried Rice":
    "A classic Indian-style fried rice with soft eggs, perfect for a quick and tasty meal.",
  "Veg Schezwan Fried Rice":
    "A filling plate of fried rice tossed with bold Schezwan flavours and fresh veggies.",
  "Egg Schezwan Fried Rice":
    "A filling egg fried rice cooked with Schezwan flavours, perfect for a tasty meal.",
  "Veg Fried Rice":
    "A bowl of veg fried rice that's simple, filling, and perfect for a quick meal.",
  "Crispy Chicken Burger With Fries":
    "Crispy fried chicken, fried egg, burger sauce & cheese served with French fries.",
  "Chicken Burger With Fries":
    "Flavourful chicken patty cooked to perfection and stuffed between soft buns along with tangy mayo, lettuce, onion, tomato.",
  "Grilled Chicken Burger With Fries":
    "Grilled chicken topped with bell pepper, mushroom, burger sauce, served with French fries.",
  "Crispy Fried Corn":
    "Corn tempered with chopped chilli, ginger, onion & capsicum.",
  "Paneer Papad Roll": "Served with garlic tomato tangy dip.",
  "Crispy Corn Kernels":
    "Crispy and golden corn bites, perfect as a veg starter to share or snack on.",
  "French Fries":
    "Crispy deep fried potato fingers – pepper, salt or periperi.",
  "Onion Rings":
    "Crispy and golden fried onion rings, perfect for a quick snack or sharing.",
  "Mushroom Manchurian":
    "A crispy and saucy mushroom dish, perfect for snack time or as a tasty Manchurian treat.",
  "Greek Pizza":
    "A cheesy pizza with a golden crust, generous toppings and a layer of melted mozzarella.",
  "Double Cheese Pizza":
    "Loaded with double layers of cheese, this veg pizza is a treat for all pizza lovers.",
  "Bbq Chicken Pizza":
    "Soft and cheesy pizza topped with smoky barbecue chicken, perfect for chicken lovers.",
  "Chicken Tikka Sandwich": "Served with French fries.",
  "Chicken Club Sandwich":
    "3 layered bread with chicken, cheese, fried egg, served with French fries.",
  "Bbq Chicken Sandwich":
    "Grilled chicken, cheddar cheese, BBQ sauce served with French fries.",
  "Grilled Chicken Sandwich":
    "Grilled chicken, onion, bell pepper, lettuce, peri peri mayonnaise sauce & French fries.",
  "Pan Fried Noodles":
    "Crispy noodles pan-fried to perfection, a tasty veg twist on classic noodle dishes.",
  "Chicken Noodles":
    "A classic plate of soft noodles tossed with flavourful chicken for a hearty meal.",
  "Veg Schezwan Noodles":
    "A filling noodle dish with a bold Schezwan kick, perfect for veggie lovers.",
  "Egg Schezwan Noodles":
    "A vibrant and aromatic preparation of perfectly seasoned Schezwan noodles mixed with succulent scrambled eggs and veggies.",
  "Veg Noodles":
    "A bowl of soft and tasty noodles loaded with wholesome veg flavors.",
  "Chicken Schezwan Noodles":
    "A classic plate of chicken noodles tossed with a bold and zesty Schezwan twist.",
});
export const menu: Product[] = Object.entries(groups).flatMap(
  ([category, items]) =>
    items.map(([name, price]) => ({
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name,
      category,
      price: price * 100,
      description: descriptions[name] || "",
      available: true,
      cake: category === "Pastries" && !name.includes("Pcs") && price >= 550,
      image:
        category === "Pastries"
          ? photos.cake
          : category === "Cookies"
            ? photos.cookies
            : category === "Bread & buns"
              ? photos.bread
              : category === "Cold beverages"
                ? photos.coffee
                : category === "Quick bites & muffins"
                  ? photos.muffin
                  : photos.food,
    })),
);
export const initialReviews = [
  "Printed menu photographs are too low resolution to confirm additional items, cake weights, flavours or variants.",
  "Pastry prices are transcribed as shown; portion sizes for prices ₹550–₹1,320 need confirmation. No size options invented.",
  "Mango Strawberry With Butterscotch: name is cropped; ₹1,100 visible. Confirm full name before adding.",
  "Opening time is not supplied. 09:00 is a demo assumption; closing time 23:30 comes from the contact screenshot.",
  "Reserve capacity, delivery coverage, lead time, loyalty and discounts are editable demo assumptions.",
  "Owner supplied Cubs paw logo is displayed at its original aspect ratio.",
];

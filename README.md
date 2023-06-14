# Drew's Flower Shop

[Homepage](#home-page) |
[Collection Page](#collection-page) |
[Product Page](#product-page) |
[Cart Page](#cart-page) |
[Other Pages](#other-pages)

[Go to Store =>](https://drews-flowershop.myshopify.com/ "Drew's Flower Shop")

<span style="text-decoration: underline">Store Password: devdrew</span>

Drew's Flower Shop is fully featured Shopify store that has all custom templates (except password and gift_card). My intention in creating this store was to fully demonstrate my ability to create a Shopify theme and showcase my understanding of web development.

This website is based off the website: [fromyouflowers.com](https://www.fromyouflowers.com/ "From You Flowers") and [Shopify's Theme Dawn](https://github.com/Shopify/dawn "Dawn")

## Store Preview

### Home page

The home page features a slideshow and featured collections as well as a featured blog post section. The home page is also fully responsive just like the entire website is.

![screenshot-homepage](https://user-images.githubusercontent.com/105955316/236931885-6fcda2a1-f183-4d32-9c0f-870abcc41dba.png)

In the header you'll notice a **predictive search bar**. The Javascript for the predictive search is based off of the predictive search implemented in dawn and appearance of the content is my own design inspired by the fromyouflower.com website.

<div align="center">
  <img style="width: 80%;" src="https://user-images.githubusercontent.com/105955316/236926892-03de600e-1d4b-4c24-afbc-9916993eb26a.png" alt="screenshot-header-10"/>
</div>

You'll also find a featured blog section that links to articles in a fully implemented blog section.

<div align="center">
  <img style="width: 80%;" src="https://user-images.githubusercontent.com/105955316/236962987-d72eb061-6544-4219-8b18-af936d7d3236.png"/>
</div>

### Collection Page

The collections page features **sorting without reloading the page**. Page data from the Shopify Section Rendering API is cached to improve performance when the page is sorted. Larger collections also feature **pagination** (check out the implementation here in the [All Sentiment collection](https://drews-flowershop.myshopify.com/collections/birthday "All Sentiment") -  
<span style="text-decoration: underline">Store Password: devdrew</span> )

<div align="center">
  <img style="width: 80%;" src="https://user-images.githubusercontent.com/105955316/236966816-8f446e0f-20d3-4c80-9eb8-de152df00055.png"/>
</div>

### Product Page

The product page is where the **user experience** is concentrated. When someone is looking to buy flowers it's hard to remember that while flowers by themselves are beautiful the recipient may appreciate some **additional gifts** that are more tangible and so those **options are presented here**. The option to upgrade premium flowers shows the **updated bouquet in the image gallery** to give the user immediate feedback about what they're purchasing and when they're ready enter a 5 digit number (a random number not necessarily a zip code) and **Choose A Delivery Date through a pop up modal**. After that the final and most thoughtful detail is presented: a complementary card to be filled out with a message and signature.

<div align="center">
  <img style="width: 80%;" src="https://user-images.githubusercontent.com/105955316/236970175-d04392a9-318b-4cd9-a2dc-325bd005092d.png"/>
</div>

The Choose a Delivery Date Modal

<div align="center">
  <img style="width: 80%;" src="https://user-images.githubusercontent.com/105955316/236974556-0a3010f9-a05a-473b-81d1-736f8eb48d32.png"/>
</div>

### Cart Page

The cart page has all the things you would expect to find like prices and images of your selected items as well as any associated details. But, in addition to those things it also has **pop up modals for changing the delivery date and editing card details** from within the cart page. The associated buttons for these modals are highlighted below.

(Details like addons, card and delivery date are only cart properties for the associated item. Future updates to this theme will implement bundling and updating delivery dates on the backend with at least 1 custom app).

<div align="center">
  <img style="width: 80%;" src="https://github.com/Gulrugar/DrewsFlowerShop/assets/105955316/b0f48151-d2f0-4500-af18-99d683884c5a"/>
</div>

The Edit Card Message Modal

<div align="center">
  <img style="width: 80%;" src="https://github.com/Gulrugar/DrewsFlowerShop/assets/105955316/7ead1bd2-4643-410e-a9e4-f80c80713ded"/>
</div>

## Other Pages

Pages like all the **customer account pages** and are implemented but are only slight variations of Dawn implementation. The **search page** is also implemented but works similarly to the search bar in the header combined with the collection page.

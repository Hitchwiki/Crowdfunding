# Crowdfunding page for Hitchwiki

Made for the Turkish hackathon 2014 -campaing.

Original [Selfstarter](https://github.com/lockitron/selfstarter) boilerplate by [Lockitron](https://github.com/lockitron/).


## Getting Started

*Note: This assumes you have Ruby 1.9.2 or later installed properly and have a basic working knowledge of how to use RubyGems*

First you'll need to fork and clone this repo

```bash
git clone https://github.com/Hitchwiki/Crowdfunding.git
```

Let's get all our dependencies setup:
```bash
bundle install --without production
```

Now let's create the database:
```bash
rake db:migrate
```

If you're using the payment options component (use_payment_options = true in settings.yml) then need to seed some data for the options:
```bash
rake db:seed
```

Let's get it running:
```bash
rails s
```

### Customizing

While it is *just* a skeleton, we did make it a little quicker to change around things like your product name, the colors, pricing, etc.

To change around the product name, tweet text, and more, open this file:

```
config/settings.yml
```

To change around the colors and fonts, open this file:

```
app/assets/stylesheets/variables.css.scss
```

To dive into the code, open this file:

```
app/controllers/preorder_controller.rb
```

### Deploying to Production

We recommend using Heroku, and we even include a ```Procfile``` for you. All you need to do is first install the [Heroku Toolbelt](https://toolbelt.heroku.com) and then run:

```bash
heroku create
git push heroku master
heroku run rake db:migrate
heroku open
```

### Email Updates

Using Amazon FPS will send users a notification when they place an order, however, it's nice to notify people when they place an order.

Something that we built into Lockitron.com was "Remind Me" functionality. The idea behind this is that you can capture potential backers and notify them near the end of your campaign that they should reserve your product. We have no data on this yet, however, it seems to be part of why Kickstarter campaigns pick up a lot of steam in their final hours.

## License
[MIT License](https://tldrlegal.com/license/mit-license).

<?php

namespace Quickstart\Bundle\AppBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DefaultControllerTest extends WebTestCase
{
    public function testIndexEn()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/en/');

        $this->assertTrue($crawler->filter('html:contains("Quickstart")')->count() > 0);
    }

    public function testIndexFr()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/fr/');

        $this->assertTrue($crawler->filter('html:contains("Quickstart")')->count() > 0);
    }

    public function testChangelog()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/changelog');

        $this->assertTrue($crawler->filter('html:contains("Changelog")')->count() > 0);
    }
}

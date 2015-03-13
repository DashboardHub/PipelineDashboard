<?php
namespace Spec\DashboardHub\Bundle\AppBundle\Service;

use GuzzleHttp\Client;
use GuzzleHttp\Message\ResponseInterface;
use GuzzleHttp\Stream\StreamInterface;
use Stash\Interfaces\ItemInterface;
use Tedivm\StashBundle\Service\CacheService as Cache;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use Symfony\Component\Security\Core\SecurityContext;

class TravisServiceSpec extends ObjectBehavior
{

    function it_is_initializable(Client $client, Cache $cache)
    {
        $this->beConstructedWith($client, $cache);
        $this->shouldHaveType('DashboardHub\Bundle\AppBundle\Service\TravisService');
    }

    function it_should_get_events_cache_hit(
        Client $client,
        Cache $cache,
        ItemInterface $item
    )
    {
        $reponame = 'test/repo';
        $limit = 5;
        $data = array('data' => 'testdata');

        $item->get()
             ->shouldBeCalled()
             ->willReturn($data);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(false);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\TravisService::getBuilds', $reponame, $limit)
              ->shouldBeCalled()
              ->willReturn($item);

        $this->beConstructedWith($client, $cache);

        $this->getBuilds($reponame, $limit);
    }


    function it_should_get_events_cache_miss(
        Client $client,
        Cache $cache,
        ItemInterface $item,
        ResponseInterface $response,
        StreamInterface $stream
    )
    {
        $reponame = 'test/repo';
        $limit = 5;
        $data = array('data' => 'testdata');

        $item->get()
             ->shouldBeCalled()
             ->willReturn($data);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(true);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\TravisService::getBuilds', $reponame, $limit)
              ->shouldBeCalled()
              ->willReturn($item);

        $stream->getContents()
               ->shouldBeCalled()
               ->willReturn(json_encode($data));

        $response->getBody()
                 ->shouldBeCalled()
                 ->willReturn($stream);

        $client->get('/repos/' . $reponame . '/builds')
               ->shouldBeCalled()
               ->willReturn($response);

        $item->set($data, 600)
             ->shouldBeCalled()
             ->willReturn(true);

        $this->beConstructedWith($client, $cache);

        $this->getBuilds($reponame, $limit);
    }
}

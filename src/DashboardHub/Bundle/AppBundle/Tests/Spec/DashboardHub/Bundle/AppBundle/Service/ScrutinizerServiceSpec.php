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

class ScrutinizerServiceSpec extends ObjectBehavior
{

    function it_is_initializable(Client $client, Cache $cache)
    {
        $this->beConstructedWith($client, $cache);
        $this->shouldHaveType('DashboardHub\Bundle\AppBundle\Service\ScrutinizerService');
    }

    function it_should_get_events_cache_hit(
        Client $client,
        Cache $cache,
        ItemInterface $item
    )
    {
        $reponame = 'test/repo';
        $data     = array('data' => 'testdata');

        $item->get()
             ->shouldBeCalled()
             ->willReturn($data);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(false);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\ScrutinizerService::getBuilds', $reponame)
              ->shouldBeCalled()
              ->willReturn($item);

        $this->beConstructedWith($client, $cache);

        $this->getBuilds($reponame);
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
        $data     = array('data' => 'testdata');

        $item->get()
             ->shouldBeCalled()
             ->willReturn($data);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(true);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\ScrutinizerService::getBuilds', $reponame)
              ->shouldBeCalled()
              ->willReturn($item);

        $stream->getContents()
               ->shouldBeCalled()
               ->willReturn(json_encode($data));

        $response->getBody()
                 ->shouldBeCalled()
                 ->willReturn($stream);

        $client->get('/api/repositories/g/' . $reponame)
               ->shouldBeCalled()
               ->willReturn($response);

        $item->set($data, 600)
             ->shouldBeCalled()
             ->willReturn(true);

        $this->beConstructedWith($client, $cache);

        $this->getBuilds($reponame);
    }

//    function it_should_get_events_cache_miss_with_exception(
//        Client $client,
//        Cache $cache,
//        ItemInterface $item,
//        ResponseInterface $response,
//        StreamInterface $stream
//    )
//    {
//        $reponame = 'test/repo';
//        $data     = array('data' => 'testdata');
//        $expected = array(
//            'applications' => array(
//
//                'develop' => array(
//                    'index' => array(
//                        '_embedded' => array(
//                            'project' => array(
//                                'metric_values' => array(
//                                    'scrutinizer.quality'       => 0,
//                                    'scrutinizer.test_coverage' => 0
//                                )
//                            )
//                        )
//                    )
//
//                )
//            )
//        );
//
//        $item->get()
//             ->shouldBeCalled()
//             ->willReturn($data);
//
//        $item->isMiss()
//             ->shouldBeCalled()
//             ->willReturn(true);
//
//        $cache
//            ->willThrow('\Exception')
//            ->duringGetItem('DashboardHub\Bundle\AppBundle\Service\ScrutinizerService::getBuilds', $reponame);
//
//        $client->get('/api/repositories/g/' . $reponame)
//               ->shouldBeCalled()
//               ->willReturn($response);
//
//        $item->set($data, 600)
//             ->shouldBeCalled()
//             ->willReturn(true);
//
//        $this->beConstructedWith($client, $cache);
//
//        $this->getBuilds($reponame)->shouldEqual($expected);
//    }
}

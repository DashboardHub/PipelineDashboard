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

class GithubServiceSpec extends ObjectBehavior
{

    function it_is_initializable(Client $client, Cache $cache)
    {
        $this->beConstructedWith($client, $cache);
        $this->shouldHaveType('DashboardHub\Bundle\AppBundle\Service\GithubService');
    }

    function it_should_get_events_cache_hit(
        Client $client,
        Cache $cache,
        ItemInterface $item
    )
    {
        $reponame = 'test/repo';
        $limit    = 5;
        $data     = array('data' => 'testdata');

        $item->get()
             ->shouldBeCalled()
             ->willReturn($data);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(false);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\GithubService::getEvents', $reponame, $limit)
              ->shouldBeCalled()
              ->willReturn($item);

        $this->beConstructedWith($client, $cache);

        $this->getEvents($reponame, $limit);
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
        $limit    = 5;
        $data     = array('data' => 'testdata');

        $item->get()
             ->shouldBeCalled()
             ->willReturn($data);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(true);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\GithubService::getEvents', $reponame, $limit)
              ->shouldBeCalled()
              ->willReturn($item);

        $stream->getContents()
               ->shouldBeCalled()
               ->willReturn(json_encode($data));

        $response->getBody()
                 ->shouldBeCalled()
                 ->willReturn($stream);

        $client->get('/repos/' . $reponame . '/events?per_page=' . $limit)
               ->shouldBeCalled()
               ->willReturn($response);

        $item->set($data, 600)
             ->shouldBeCalled()
             ->willReturn(true);

        $this->beConstructedWith($client, $cache);

        $this->getEvents($reponame, $limit);
    }

    function it_should_get_pullrequests_cache_hit(
        Client $client,
        Cache $cache,
        ItemInterface $item
    )
    {
        $reponame = 'test/repo';
        $limit    = 5;
        $data     = array('data' => 'testdata');

        $item->get()
             ->shouldBeCalled()
             ->willReturn($data);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(false);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\GithubService::getPullRequests', $reponame, $limit)
              ->shouldBeCalled()
              ->willReturn($item);

        $this->beConstructedWith($client, $cache);

        $this->getPullRequests($reponame, $limit);
    }


    function it_should_get_pullrequests_cache_miss(
        Client $client,
        Cache $cache,
        ItemInterface $item,
        ResponseInterface $response,
        StreamInterface $stream
    )
    {
        $reponame = 'test/repo';
        $limit    = 5;
        $data     = array('data' => 'testdata');

        $item->get()
             ->shouldBeCalled()
             ->willReturn($data);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(true);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\GithubService::getPullRequests', $reponame, $limit)
              ->shouldBeCalled()
              ->willReturn($item);

        $stream->getContents()
               ->shouldBeCalled()
               ->willReturn(json_encode($data));

        $response->getBody()
                 ->shouldBeCalled()
                 ->willReturn($stream);

        $client->get('/repos/' . $reponame . '/pulls?state=open&per_page=' . $limit)
               ->shouldBeCalled()
               ->willReturn($response);

        $item->set($data, 600)
             ->shouldBeCalled()
             ->willReturn(true);

        $this->beConstructedWith($client, $cache);

        $this->getPullRequests($reponame, $limit);
    }

    function it_should_get_issues_cache_hit(
        Client $client,
        Cache $cache,
        ItemInterface $item
    )
    {
        $reponame = 'test/repo';
        $limit    = 5;
        $data     = array('data' => 'testdata');

        $item->get()
             ->shouldBeCalled()
             ->willReturn($data);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(false);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\GithubService::getIssues', $reponame, $limit)
              ->shouldBeCalled()
              ->willReturn($item);

        $this->beConstructedWith($client, $cache);

        $this->getIssues($reponame, $limit);
    }


    function it_should_get_issues_cache_miss(
        Client $client,
        Cache $cache,
        ItemInterface $item,
        ResponseInterface $response,
        StreamInterface $stream
    )
    {
        $reponame = 'test/repo';
        $limit    = 5;
        $data     = array('data' => 'testdata');

        $item->get()
             ->shouldBeCalled()
             ->willReturn($data);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(true);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\GithubService::getIssues', $reponame, $limit)
              ->shouldBeCalled()
              ->willReturn($item);

        $stream->getContents()
               ->shouldBeCalled()
               ->willReturn(json_encode($data));

        $response->getBody()
                 ->shouldBeCalled()
                 ->willReturn($stream);

        $client->get('/repos/' . $reponame . '/issues?state=open&per_page=' . $limit)
               ->shouldBeCalled()
               ->willReturn($response);

        $item->set($data, 600)
             ->shouldBeCalled()
             ->willReturn(true);

        $this->beConstructedWith($client, $cache);

        $this->getIssues($reponame, $limit);
    }

    function it_should_get_branches_cache_hit(
        Client $client,
        Cache $cache,
        ItemInterface $item
    )
    {
        $reponame = 'test/repo';
        $limit    = 5;
        $data     = array('data' => 'testdata');

        $item->get()
             ->shouldBeCalled()
             ->willReturn($data);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(false);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\GithubService::getBranches', $reponame, $limit)
              ->shouldBeCalled()
              ->willReturn($item);

        $this->beConstructedWith($client, $cache);

        $this->getBranches($reponame, $limit);
    }


    function it_should_get_branches_cache_miss(
        Client $client,
        Cache $cache,
        ItemInterface $item,
        ResponseInterface $response,
        StreamInterface $stream
    )
    {
        $reponame = 'test/repo';
        $limit    = 5;
        $data     = array('data' => 'testdata');

        $item->get()
             ->shouldBeCalled()
             ->willReturn($data);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(true);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\GithubService::getBranches', $reponame, $limit)
              ->shouldBeCalled()
              ->willReturn($item);

        $stream->getContents()
               ->shouldBeCalled()
               ->willReturn(json_encode($data));

        $response->getBody()
                 ->shouldBeCalled()
                 ->willReturn($stream);

        $client->get('/repos/' . $reponame . '/branches?per_page=' . $limit)
               ->shouldBeCalled()
               ->willReturn($response);

        $item->set($data, 600)
             ->shouldBeCalled()
             ->willReturn(true);

        $this->beConstructedWith($client, $cache);

        $this->getBranches($reponame, $limit);
    }

    function it_should_get_milestones_cache_hit(
        Client $client,
        Cache $cache,
        ItemInterface $item
    )
    {
        $reponame = 'test/repo';
        $limit    = 5;
        $data     = array('data' => 'testdata');

        $item->get()
             ->shouldBeCalled()
             ->willReturn($data);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(false);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\GithubService::getMilestones', $reponame, $limit)
              ->shouldBeCalled()
              ->willReturn($item);

        $this->beConstructedWith($client, $cache);

        $this->getMilestones($reponame, $limit);
    }


    function it_should_get_milestones_cache_miss(
        Client $client,
        Cache $cache,
        ItemInterface $item,
        ResponseInterface $response,
        StreamInterface $stream
    )
    {
        $reponame = 'test/repo';
        $limit    = 5;
        $data     = array(
            'closed_issues' => 5,
            'open_issues'   => 5
        );
        $expected = array_merge(
            $data, array('completeness' => 50)
        );

        $item->get()
             ->shouldBeCalled()
             ->willReturn($data);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(true);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\GithubService::getMilestones', $reponame, $limit)
              ->shouldBeCalled()
              ->willReturn($item);

        $stream->getContents()
               ->shouldBeCalled()
               ->willReturn(json_encode(array($data)));

        $response->getBody()
                 ->shouldBeCalled()
                 ->willReturn($stream);

        $client->get('/repos/' . $reponame . '/milestones?per_page=' . $limit)
               ->shouldBeCalled()
               ->willReturn($response);

        $item->set(array($expected), 600)
             ->shouldBeCalled()
             ->willReturn(true);

        $this->beConstructedWith($client, $cache);

        $this->getMilestones($reponame, $limit)
             ->shouldBeLike(array($expected));
    }

    function it_should_get_milestones_cache_miss_no_issues(
        Client $client,
        Cache $cache,
        ItemInterface $item,
        ResponseInterface $response,
        StreamInterface $stream
    )
    {
        $reponame = 'test/repo';
        $limit    = 5;
        $data     = array(
            'closed_issues' => 0,
            'open_issues'   => 0
        );
        $expected = array_merge(
            $data, array('completeness' => 0)
        );

        $item->get()
             ->shouldBeCalled()
             ->willReturn($data);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(true);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\GithubService::getMilestones', $reponame, $limit)
              ->shouldBeCalled()
              ->willReturn($item);

        $stream->getContents()
               ->shouldBeCalled()
               ->willReturn(json_encode(array($data)));

        $response->getBody()
                 ->shouldBeCalled()
                 ->willReturn($stream);

        $client->get('/repos/' . $reponame . '/milestones?per_page=' . $limit)
               ->shouldBeCalled()
               ->willReturn($response);

        $item->set(array($expected), 600)
             ->shouldBeCalled()
             ->willReturn(true);

        $this->beConstructedWith($client, $cache);

        $this->getMilestones($reponame, $limit)
             ->shouldBe(array($expected));
    }

    function it_should_get_contributors_cache_hit(
        Client $client,
        Cache $cache,
        ItemInterface $item
    )
    {
        $reponame = 'test/repo';
        $data     = array(
            array(
                'total' => 100
            )
        );

        $item->get()
             ->shouldBeCalled()
             ->willReturn($data);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(false);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\GithubService::getContributors', $reponame)
              ->shouldBeCalled()
              ->willReturn($item);

        $this->beConstructedWith($client, $cache);

        $this->getContributors($reponame)
             ->shouldBeLike($data);
    }

    function it_should_get_contributors_cache_mis(
        Client $client,
        Cache $cache,
        ItemInterface $item,
        ResponseInterface $response,
        StreamInterface $stream
    )
    {
        $reponame = 'test/repo';
        $data     = array(
            array(
                'total' => 100
            )
        );

        $item->get()
             ->shouldBeCalled()
             ->willReturn($data);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(true);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\GithubService::getContributors', $reponame)
              ->shouldBeCalled()
              ->willReturn($item);

        $stream->getContents()
               ->shouldBeCalled()
               ->willReturn(json_encode($data));

        $response->getBody()
                 ->shouldBeCalled()
                 ->willReturn($stream);

        $client->get('/repos/' . $reponame . '/stats/contributors')
               ->shouldBeCalled()
               ->willReturn($response);

        $item->set($data, 60 * 60 * 24)
             ->shouldBeCalled()
             ->willReturn(true);

        $this->beConstructedWith($client, $cache);

        $this->getContributors($reponame)
             ->shouldBeLike($data);
    }

    function it_should_get_commit_total_cache_hit(
        Client $client,
        Cache $cache,
        ItemInterface $item
    )
    {
        $reponame = 'test/repo';
        $data     = 300;
        $expected = 300;

        $item->get()
             ->shouldBeCalled()
             ->willReturn($data);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(false);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\GithubService::getCommitTotal', $reponame)
              ->shouldBeCalled()
              ->willReturn($item);

        $this->beConstructedWith($client, $cache);

        $this->getCommitTotal($reponame)
             ->shouldBeLike($expected);
    }

    function it_should_get_commit_total_cache_miss(
        Client $client,
        Cache $cache,
        ItemInterface $item,
        ResponseInterface $response,
        StreamInterface $stream
    )
    {
        $reponame = 'test/repo';
        $data     = array(
            'all' => array(100, 200)
        );
        $expected = 300;

        $item->get()
             ->shouldBeCalled()
             ->willReturn($data);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(true);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\GithubService::getCommitTotal', $reponame)
              ->shouldBeCalled()
              ->willReturn($item);

        $stream->getContents()
               ->shouldBeCalled()
               ->willReturn(json_encode($data));

        $response->getBody()
                 ->shouldBeCalled()
                 ->willReturn($stream);

        $client->get('/repos/' . $reponame . '/stats/participation')
               ->shouldBeCalled()
               ->willReturn($response);

        $item->set($expected, 60 * 60 * 24)
             ->shouldBeCalled()
             ->willReturn(true);

        $this->beConstructedWith($client, $cache);

        $this->getCommitTotal($reponame)
             ->shouldBeLike($expected);
    }

    function it_should_get_top_contributors_cache_hit(
        Client $client,
        Cache $cache,
        ItemInterface $item
    )
    {
        $reponame = 'test/repo';
        $limit    = 4;
        $data     = array(
            0 => array(
                'weeks' => array(
                    array(
                        'w' => time(),
                        'c' => 100
                    )
                )
            )
        );
        $expected = array_merge($data[0], array('percentage' => 50));

        $item->get()
             ->shouldBeCalled()
             ->willReturn($expected);

        $item->isMiss()
             ->shouldBeCalled()
             ->willReturn(false);

        $cache->getItem('DashboardHub\Bundle\AppBundle\Service\GithubService::getTopContributors', $reponame, $limit)
              ->shouldBeCalled()
              ->willReturn($item);

        $this->beConstructedWith($client, $cache);

        $this->getTopContributors($reponame)
             ->shouldBeLike($expected);
    }
}

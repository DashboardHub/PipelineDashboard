<?php
namespace DashboardHub\Bundle\DevelopmentBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class CachePrimeCommand extends ContainerAwareCommand
{

    protected $ttl = 600;

    protected $dataServices = array(
        'github-events.json'          => array(
            'DashboardHub\Bundle\AppBundle\Service\GithubService::getEvents',
            'DashboardHub/PipelineDashboard',
            '5'
        ),
        'github-events-1.json'          => array(
            'DashboardHub\Bundle\AppBundle\Service\GithubService::getEvents',
            'DashboardHub/PipelineDashboard',
            '1'
        ),
        'github-pullrequests.json'    => array(
            'DashboardHub\Bundle\AppBundle\Service\GithubService::getPullRequests',
            'DashboardHub/PipelineDashboard',
            '5'
        ),
        'github-issues.json'          => array(
            'DashboardHub\Bundle\AppBundle\Service\GithubService::getIssues',
            'DashboardHub/PipelineDashboard',
            '5'
        ),
        'github-milestones.json'      => array(
            'DashboardHub\Bundle\AppBundle\Service\GithubService::getMilestones',
            'DashboardHub/PipelineDashboard',
            '5'
        ),
        'github-milestones-1.json'      => array(
            'DashboardHub\Bundle\AppBundle\Service\GithubService::getMilestones',
            'DashboardHub/PipelineDashboard',
            '1'
        ),
        'github-topcontributors.json' => array(
            'DashboardHub\Bundle\AppBundle\Service\GithubService::getTopContributors',
            'DashboardHub/PipelineDashboard',
            '4'
        ),
    );

    protected function configure()
    {
        $this
            ->setName('cache:prime')
            ->setDescription('Prime cache with mock data');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $cacheService = $this->getContainer()->get('stash');

        foreach ($this->dataServices as $file => $namespace) {
            $data = json_decode(file_get_contents('src/DashboardHub/Bundle/DevelopmentBundle/Resources/mocks/' . $file), true);

            $cache = $cacheService->getItem($namespace);
            $cache->set($data, $this->ttl);
        }

        $output->writeln('Cache primed with mock data');
    }
}

<?php
namespace Quickstart\Bundle\AppBundle\DataFixtures\ORM;

use DashboardHub\Bundle\AppBundle\Entity\Dashboard;
use DashboardHub\Bundle\AppBundle\Entity\User;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadUserData
 * @package DashboardHub\Bundle\AppBundle\DataFixtures\ORM
 */
class LoadDashboardData implements FixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $this->addDefaultDashboard($manager);
        $manager->flush();
    }

    /**
     * @param ObjectManager $manager
     *
     * @return LoadDashboardData
     */
    public function addDefaultDashboard(ObjectManager $manager)
    {
        $user = new User('DashboardHub');


        $dashboard = new Dashboard();
        $dashboard->setUid(uniqid('', true));
        $dashboard->setUser($user);
        $dashboard->setName('Example Dashboard');
        $dashboard->setRepository('DashboardHub/PipelineDashboard');
        $dashboard->setTheme('DashboardHubAppBundle:Template:GithubTravis.html.twig');
        $dashboard->setPublic(true);
        $dashboard->setCreatedOn(new \DateTime());
        $dashboard->setUpdatedOn(new \DateTime());
        $manager->persist($dashboard);

        return $this;
    }
}

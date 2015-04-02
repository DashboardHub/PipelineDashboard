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
        $user = new User('DashboardHub');

        $this->addDefaultDashboard($manager, $user);
        $this->addOldDashboard($manager, $user);
        $this->addPrivateDashboard($manager, $user);
        $this->addMostPopularDashboard($manager, $user);
        $manager->flush();
    }

    /**
     * @param ObjectManager $manager
     * @param User $user
     *
     * @return LoadDashboardData
     */
    public function addDefaultDashboard(ObjectManager $manager, User $user)
    {
        $dashboard = new Dashboard();
        $dashboard->setUid(123);
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

    /**
     * @param ObjectManager $manager
     * @param User $user
     *
     * @return LoadDashboardData
     */
    public function addOldDashboard(ObjectManager $manager, User $user)
    {
        $dashboard = new Dashboard();
        $dashboard->setUid(uniqid('', true));
        $dashboard->setUser($user);
        $dashboard->setName('Old Dashboard');
        $dashboard->setRepository('symfony/symfony');
        $dashboard->setTheme('DashboardHubAppBundle:Template:GithubTravis.html.twig');
        $dashboard->setPublic(true);
        $dashboard->setCreatedOn(new \DateTime('2010-01-01 00:00:00'));
        $dashboard->setUpdatedOn(new \DateTime());
        $manager->persist($dashboard);

        return $this;
    }

    /**
     * @param ObjectManager $manager
     * @param User $user
     *
     * @return LoadDashboardData
     */
    public function addPrivateDashboard(ObjectManager $manager, User $user)
    {
        $dashboard = new Dashboard();
        $dashboard->setUid(uniqid('', true));
        $dashboard->setUser($user);
        $dashboard->setName('Private Dashboard');
        $dashboard->setRepository('zendframework/zf2');
        $dashboard->setTheme('DashboardHubAppBundle:Template:GithubTravis.html.twig');
        $dashboard->setPublic(false);
        $dashboard->setCreatedOn(new \DateTime());
        $dashboard->setUpdatedOn(new \DateTime());
        $manager->persist($dashboard);

        return $this;
    }

    /**
     * @param ObjectManager $manager
     * @param User $user
     *
     * @return LoadDashboardData
     */
    public function addMostPopularDashboard(ObjectManager $manager, User $user)
    {
        $dashboard = new Dashboard();
        $dashboard->setUid(uniqid('', true));
        $dashboard->setUser($user);
        $dashboard->setName('Most Popular Dashboard');
        $dashboard->setRepository('symfony/symfony');
        $dashboard->setTheme('DashboardHubAppBundle:Template:Github.html.twig');
        $dashboard->setPublic(true);
        $dashboard->setPublicViews(10000);
        $dashboard->setCreatedOn(new \DateTime());
        $dashboard->setUpdatedOn(new \DateTime());
        $manager->persist($dashboard);

        return $this;
    }
}

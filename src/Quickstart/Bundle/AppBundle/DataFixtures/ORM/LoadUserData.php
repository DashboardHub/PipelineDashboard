<?php

namespace Quickstart\Bundle\AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Quickstart\Bundle\AppBundle\Entity\User;

/**
 * Class LoadUserData
 * @package Quickstart\Bundle\AppBundle\DataFixtures\ORM
 */
class LoadUserData implements FixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $this->addUser($manager);

        $manager->flush();
    }

    public function addUser(ObjectManager $manager)
    {
        $user = new User();
        $user->setFirstname('admin');
        $user->setLastname('test');
        $user->setUsername('admin@test.com');
        $user->setEmail('admin@test.com');
        $user->setPlainPassword('password');
        $user->setEnabled(true);
        $manager->persist($user);

        return $this;
    }
}

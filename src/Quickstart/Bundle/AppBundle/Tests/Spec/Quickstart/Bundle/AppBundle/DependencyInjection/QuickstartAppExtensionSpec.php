<?php

namespace Spec\Quickstart\Bundle\AppBundle\DependencyInjection;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class QuickstartAppExtensionSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('Quickstart\Bundle\AppBundle\DependencyInjection\QuickstartAppExtension');
    }

    /**
     * @TODO: Improve Spec
     */
    function it_should_load(ContainerBuilder $container)
    {
        $this->load(array(), $container);
    }
}
